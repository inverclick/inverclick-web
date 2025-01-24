import { COULD_NOT_REGISTER_USER_TO_NEWSLETTER } from "@/components/shared/footer/constants/messages";
import { DUPLICATE_KEY_VALUE_VIOLATION } from "@/constants/postgre-errors";
import { createClient } from "@/services/supabase/browser-client";

/**
 * Registers a user to the newsletter by inserting their email into the database.
 *
 * @param {string} email - The email address of the user to register.
 * @returns {Promise<void>} A promise that resolves when the registration process is complete.
 *
 * This function uses Supabase to insert the user's email into the "newsletter_users" table.
 * If the email is already registered (duplicate key error), it will silently succeed without throwing an error.
 * For any other insertion errors, it throws an error with a message indicating registration failure.
 */

export async function registerUserToNewsletter(email: string): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase.from("newsletter_users").insert({ email });

  /**
   * Ignore duplicate key error because when user is already registered to newsletter, just let them continue.
   */
  if (error) {
    if (error.code === DUPLICATE_KEY_VALUE_VIOLATION) return;
    throw new Error(COULD_NOT_REGISTER_USER_TO_NEWSLETTER);
  }
}
