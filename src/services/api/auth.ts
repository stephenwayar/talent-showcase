import { IUser } from "@/types/user.types";
import { supabase } from "@/config/supabase";
import { LoginPayload, RegistrationPayload } from "../types/auth.types";

export const login = async (payload: LoginPayload): Promise<IUser> => {
  // Step 1: Authenticate with email/password
  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email: payload.email,
    password: payload.password,
  });

  if (error) {
    throw error;
  }

  // Step 2: Fetch the user's account data from the accounts table
  const { data: accountData, error: accountError } = await supabase
    .from('accounts')
    .select('*')
    .eq('user_id', authData.user.id)
    .single();

  if (accountError) {
    throw new Error('Failed to retrieve user profile');
  }

  // Step 3: Construct and return the user object
  const user: IUser = {
    bio: accountData.bio,
    fullName: accountData.fullName,
    location: accountData.location,
    email: authData.user.email as string,
    profilePhoto: accountData.profilePhoto,
    accessToken: authData.session.access_token,
  };

  return user;
};

export const register = async (payload: RegistrationPayload) => {
  // First check if the email already exists in the accounts table
  const { data: existingAccount, error: searchError } = await supabase
    .from('accounts')
    .select('email')
    .eq('email', payload.email)
    .limit(1);

  if (searchError) {
    throw new Error('Error checking email availability');
  }

  // If found an account with this email, reject the registration
  if (existingAccount && existingAccount.length > 0) {
    throw new Error('User already exists');
  }

  // Proceed with registration if email is not already used
  const { data: authData, error } = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
  });

  if (error) {
    throw error;
  }

  if (!authData.user) {
    throw new Error("Registration failed");
  }

  // After successful registration, store user data in accounts table
  const { error: insertError } = await supabase
    .from('accounts')
    .insert({
      bio: '',
      profilePhoto: '',
      email: payload.email,
      user_id: authData.user.id,
      fullName: payload.fullName,
      location: payload.location,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });

  if (insertError) {
    throw new Error('Account created but failed to store profile data');
  }

  return authData;
}