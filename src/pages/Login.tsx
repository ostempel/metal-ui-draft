"use client";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { invoke } from "@tauri-apps/api/core";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthProvider";
import { useNavigate } from "react-router";

const formSchema = z.object({
  apiUrl: z.url("Please enter a valid URL"),
});

export default function Login() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiUrl: "http://v2.api.172.17.0.1.nip.io:8080",
    },
  });

  const auth = useAuth();
  if (auth.isAuthenticated) {
    navigate("/");
    return null;
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    invoke("start_oauth_login", { apiUrl: values.apiUrl });
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-sidebar">
      <Card className="w-full max-w-md p-8">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">Login</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="apiUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://v2.api.172.17.0.1.nip.io:8080"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is the URL of your API server.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Connect
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}
