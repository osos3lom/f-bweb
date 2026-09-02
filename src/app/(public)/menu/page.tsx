import React from "react";
import { Metadata } from "next";
import { MenuList } from "@/components/menu/menu-list";

export const metadata: Metadata = {
  title: "Bitrina Menu | قائمة بترينا",
  description: "Browse Bitrina's digital showcase menu: specialty coffee, tarwiqa breakfast, mezze, grills, vitrine desserts, and juices.",
};

export default function MenuPage() {
  return <MenuList />;
}
