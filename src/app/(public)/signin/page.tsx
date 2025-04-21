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
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await login(email, password);
      router.push("/");
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  const handleForgot = () => {
    
  }

  return (
    <Main style={{ justifyContent: "center", alignItems: "center" }}>
      <Row align="center">
        <Column
          style={{ borderRadius: 16, flex: 1 }}
          gv={20}
          ph={16}
          pv={16}
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
          <Button label="Entrar" onPress={handleLogin} />
          <Button variant="ghost" label="Esqueci a senha" onPress={handleForgot} />
        </Column>
      </Row>
    </Main>
  );
}
