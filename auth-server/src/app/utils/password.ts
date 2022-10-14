import bcrypt from "bcryptjs";
import passwordValidator from "password-validator";
import { HttpErrors } from "../error";

export async function encryptPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

export async function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function validatePassword(password: string): boolean {
  var schema = new passwordValidator();

  schema
    .is().min(8) // Minimum length 8
    .is().max(100) // Maximum length 100
    .has().uppercase() // Must have uppercase letters
    .has().lowercase() // Must have lowercase letters
    .has().digits(1) // Must have at least 1 digits
    .has().symbols(1) // Must have at least 1 special character
    .has().not().spaces() // Should not have spaces

    const res = schema.validate(password, {details: true});

    if(Array.isArray(res) && res.length > 0) {
        // Failed Validation
        throw new HttpErrors.HttpValidationError("Invalid Password", res);
    }

    return true;
}
