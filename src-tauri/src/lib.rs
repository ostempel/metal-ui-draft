// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use tauri::Emitter;
use tauri_plugin_opener::OpenerExt;

use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct CliConfig {
    pub contexts: Vec<Context>,

    #[serde(rename(serialize = "currentContext", deserialize = "current-context"))]
    pub current_context: Option<String>,

    #[serde(rename(serialize = "previousContext", deserialize = "previous-context"))]
    pub previous_context: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Context {
    pub name: String,

    #[serde(rename(serialize = "apiToken", deserialize = "api-token"))]
    pub api_token: String,

    #[serde(rename(serialize = "apiUrl", deserialize = "api-url"))]
    pub api_url: String,

    #[serde(rename(serialize = "defaultProject", deserialize = "default-project"))]
    pub default_project: String,

    pub provider: String,
}

#[tauri::command]
fn read_cli_config() -> Result<CliConfig, String> {
    let home = dirs::home_dir().ok_or("no home dir found")?;
    let path = home.join(".metal-stack").join("config.yaml");

    let content =
        std::fs::read_to_string(&path).map_err(|e| format!("failed to read config: {}", e))?;

    let config: CliConfig =
        serde_yaml::from_str(&content).map_err(|e| format!("invalid yaml: {}", e))?;

    Ok(config)
}

#[tauri::command]
async fn start_oauth_login(app: tauri::AppHandle, api_url: String) -> Result<(), String> {
    let listener = std::net::TcpListener::bind("127.0.0.1:0").map_err(|e| e.to_string())?;

    let addr = listener.local_addr().unwrap();
    let port = addr.port();

    let redirect_url = format!("http://127.0.0.1:{}/callback", port);
    let oauth_url = format!(
        "{}/auth/openid-connect?redirect-url={}",
        api_url.trim_end_matches('/'),
        urlencoding::encode(&redirect_url)
    );

    app.opener()
        .open_url(oauth_url, None::<&str>)
        .map_err(|e| e.to_string())?;

    tauri::async_runtime::spawn(async move {
        handle_callback(listener, app).await;
    });

    Ok(())
}

async fn handle_callback(listener: std::net::TcpListener, app: tauri::AppHandle) {
    for stream in listener.incoming() {
        if let Ok(mut stream) = stream {
            use std::io::{Read, Write};

            let mut buffer = [0; 2048];
            let _ = stream.read(&mut buffer);

            let request = String::from_utf8_lossy(&buffer);

            if let Some(token) = extract_token(&request) {
                app.emit("oauth-token", token).ok();
            }

            let response = "HTTP/1.1 302 Found\r\nLocation: https://metal-stack.io\r\n\r\n";
            let _ = stream.write_all(response.as_bytes());
            break;
        }
    }
}

fn extract_token(request: &str) -> Option<String> {
    let start = request.find("token=")? + 6;
    let end = request[start..].find(' ').unwrap_or(0);
    Some(request[start..start + end].to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![start_oauth_login, read_cli_config])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
