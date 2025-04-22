"use client";
import React, { useState } from "react";
import { Column, Row, Title, Label } from "@/ui";
import Link from "next/link";
import Image from "next/image";
import { Home, Library, Search, UserCircle } from "lucide-react";
import "./styles.css";

interface ItemLink {
  name: string;
  icon: React.ReactNode;
  page: string;
}

export default function SideBar() {
  const [openTab, setOpenTab] = useState(false);

  const links = [
    {
      name: "Início",
      icon: <Home size={28} />,
      page: "home",
    },
    {
      name: "Pesquisar",
      icon: <Search size={28}/>,
      page: "search",
    },
    {
      name: "Conta",
      icon: <UserCircle size={28}/>,
      page: "account",
    },
    {
      name: "Coleções",
      icon: <Library size={28}/>,
      page: "collections",
    },
  ];

  const Item: React.FC<{ item: ItemLink }> = ({ item }) => {
    return (
      <Link href={`/${item.page}`} style={{ textDecoration: "none",}} >
        <Row >
          <Column style={{width: 58, height: 58, color: "#d7d7d7", borderRadius: 6, }} justify="center" align="center" className="button-sidebar">
            {item.icon}
          </Column>
          {openTab && (
            <Title
              style={{ fontSize: 22, color: "#d7d7d7", fontFamily: "Book" }}
            >
              {item.name}
            </Title>
          )}
        </Row>
      </Link>
    );
  };

  return (
    <Column
      style={{
        height: "100vh",
        width: openTab ? "400px" : "70px",
        transition: ".2s linear",
        padding: 12,
      }}
    >
      <Column style={{ backgroundColor: "#171717", borderRadius: 12 }} pv={6} ph={6} justify="center" align="center">
        <Image
          src="/icon.png"
          alt="logo s2mangas"
          width={42}
          height={36}
          style={{ objectFit: "cover", alignSelf: "center", marginTop: 20, marginBottom: 24, }}
        />
        {links?.map((item: ItemLink, index: number) => (
          <Item item={item} key={index} />
        ))}
      </Column>
    </Column>
  );
}

/*
 <Row
        style={{
          marginBottom: -15,
          marginTop: 20,
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: 5,
        }}
      >
        <Row style={{ alignItems: "center" }}>
          <Column
            onClick={() => {
              if (openTab) {
                setOpenTab(false);
                setGrid(true);
              } else {
                setOpenTab(true);
              }
            }}
            style={{ marginLeft: 0, marginRight: -20 }}
          >
            <BsCollection />
          </Column>
          {openTab && (
            <Label style={{ fontSize: 18, marginTop: -4, marginLeft: 10 }}>
              Coleções
            </Label>
          )}
        </Row>
        {openTab && (
          <Row>
            <Row>
              <Button
                onClick={() => setGrid(!grid)}
                style={{
                  fontSize: 18,
                  color: grid ? "#fff" : "#000",
                  width: 36,
                  height: 36,
                  textAlign: "center",
                  borderRadius: 100,
                  transition: ".2s linear",
                  backgroundColor: grid ? "#262626" : "#fff",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IoGridOutline style={{ marginTop: 5 }} />
              </Button>
              <Link
                href={"/collections"}
                style={{
                  fontSize: 22,
                  color: "#fff",
                  width: 36,
                  textAlign: "center",
                  height: 36,
                  marginLeft: 10,
                  borderRadius: 100,
                  backgroundColor: "#262626",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IoArrowForward style={{ marginTop: 7 }} />
              </Link>
            </Row>
          </Row>
        )}
      </Row>
*/
