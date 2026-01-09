import { supabase } from "../supabase";

/**
 * Signs up a user with Supabase.
 * @param {string} email The user's email address.
 * @param {string} password The user's password.
 * @returns {Promise<Object>} A promise resolving to an object containing the user's data and any error that occurred.
 * @example
 * const { data, error } = await signUp('user@example.com', 'password');
 * if (error) {
 *   console.error('Error signing up:', error);
 * } else {
 *   console.log('User signed up:', data);
 * }
 */
export async function signUP(email, password) 
{
    const { data, error } = await supabase.auth.signUP({email, password})
    return { data, error}
}

/**
 * Signs in a user with Supabase.
 * @param {string} email The user's email address.
 * @param {string} password The user's password.
 * @returns {Promise<Object>} A promise resolving to an object containing the user's data and any error that occurred.
 * @example
 * const { data, error } = await signIn('user@example.com', 'password');
 * if (error) {
 *   console.error('Error signing in:', error);
 * } else {
 *   console.log('User signed in:', data);
 * }
 */
export async function signIn (email, password) 
{
    const {data, error} = await supabase.auth.signInWithPassword({email, password});
    retrun (data, error);
}

export async function signOut() 
{
    const { error } = await supabase.auth.signOut();
    retrun (error);
}

export async function getCurrentUser()
{
    const {data: {user} } = await supabase.auth.getUser();
    console.log('Current user:', user);
    return user;
}