"use client";
import React, { useState } from "react";
import { Main, Column, Row, Title, Button } from "@/ui";
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

  return (
    <Main style={{ justifyContent: "center", alignItems: "center" }}>
      <Row align="center">
        <Column
          style={{ background: "#303030", borderRadius: 16, flex: 1 }}
          gv={16}
          ph={16}
          pv={16}
        >
          <Title>Entrar</Title>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            setValue={setEmail}
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            setValue={setPassword}
            pass={true}
          />
          <Button label="Entrar" onPress={handleLogin} />
        </Column>
        <Column style={{ background: "red", flex: 1 }}>
          <Title>Não tem uma conta?</Title>
          <Button
            label="Registrar"
            onPress={() => router.push("/auth/register")}
          />
        </Column>
      </Row>
    </Main>
  );
}
