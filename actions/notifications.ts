"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export type NotificationItem = {
  id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
};

async function getCurrentUserId(): Promise<string | null> {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user?.id ?? null;
}

export async function getNotifications(): Promise<NotificationItem[]> {
  const userId = await getCurrentUserId();
  if (!userId) return [];

  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 20,
    select: { id: true, type: true, title: true, message: true, read: true, createdAt: true },
  });
}

export async function markAllNotificationsRead(): Promise<void> {
  const userId = await getCurrentUserId();
  if (!userId) return;

  await prisma.notification.updateMany({
    where: { userId, read: false },
    data: { read: true },
  });
}
