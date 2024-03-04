import { db } from "./client";

import type { User } from "@prisma/client";

const DEFAULT_USERS = [
  {
    name: "Tim Apple",
    email: "tim@apple.com",
  },
] as Array<Partial<User>>;

(async () => {
  try {
    await Promise.all(
      DEFAULT_USERS.map((user) =>
        db.user.upsert({
          where: {
            email: user.email!,
          },
          update: {
            ...user,
          },
          create: {
            name: user.name!,
            email: user.email!,
          },
        }),
      ),
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
})();
