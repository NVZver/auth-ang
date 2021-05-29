/**
 * Information required to Sing Up a new user
 * Example:
 * ```typescript
 * {
 *   firstName: "Thomas",
 *   lastName: "Shelby",
 *   email: "thomas@shelby.co.uk"
 * }
 * ```
 */
export interface SingUpRequestData {
  firstName: string;
  lastName: string;
  email: string;
}
