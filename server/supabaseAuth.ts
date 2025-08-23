import type { Express, RequestHandler } from "express";
import { createClient } from "@supabase/supabase-js";
import { storage } from "./storage";

// Supabase server client for verifying user tokens
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  throw new Error("SUPABASE_URL and SUPABASE_ANON_KEY must be set");
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export async function setupAuth(_app: Express) {
  // No session or passport setup needed for JWT-based auth.
}

export const isAuthenticated: RequestHandler = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || Array.isArray(authHeader)) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const [scheme, token] = authHeader.split(" ");
    if (scheme?.toLowerCase() !== "bearer" || !token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data?.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = data.user;

    // Make user claims compatible with existing routes expecting req.user.claims.sub
    (req as any).user = {
      id: user.id,
      email: user.email,
      claims: { sub: user.id, email: user.email },
    };

    // Upsert user record
    await storage.upsertUser({
      id: user.id,
      email: user.email || undefined,
      firstName: undefined,
      lastName: undefined,
      profileImageUrl: undefined,
    });

    return next();
  } catch {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
