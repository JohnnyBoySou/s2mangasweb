"use client";
import React, { useState } from "react";
import { Main, Column, Row, Title, Button, Label } from "@/ui";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Input from "@/ui/elements/input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [error, seterror] = useState();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await login(email, password);
      router.push("/");
    } catch (error) {
      seterror(error.message)
      console.error("Erro no login:", error);
      return false;
    }
  };

  const handleForgot = () => { return true};

  return (
    <Main style={{ flex: 1, display: "flex" , justifyContent: "center", alignItems: "center", }}>
      <Column justify="center" align="center">
        <Column
          style={{ borderRadius: 16, flex: 1, border: "2px solid #303030" }}
          gv={20}
          ph={56}
          pv={56}
        >
          <Title>Bem-vindo de volta!</Title>
          <Input
            type="email"
            placeholder="Email"
            label="Email"
            value={email}
            setValue={setEmail}
          />
          <Input
            type="password"
            label="Senha"
            placeholder="Senha"
            value={password}
            setValue={setPassword}
            pass={true}
          />
          {error && <Label>{error}</Label>}

          <Button label="Entrar" onPress={handleLogin} />
          <Button
            variant="ghost"
            label="Esqueci a senha"
            onPress={handleForgot}
          />
        </Column>
      </Column>
    </Main>
  );
}
