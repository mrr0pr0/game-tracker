import { supabase } from "../supabase";

export async function getGames() {
  const { data, error } = await supabase
    .from("games")
    .select("*")
    .order("created_at", { ascending: false });

  return { data, error };
}

// add a new game
export async function addGame(game) {
  const { data, error } = await supabase.from("games").insert([game]).select();

  return { data, error };
}

//upadta game
export async function updateGame(id, uptades) {
  const { data, error } = await supabase
    .from("games")
    .update({ ...uptades, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select();

  return { data, error };
}

// delete a game
export async function deleteGame(id) {
  const { error } = await supabase.from("games").delete().eq("id", id);

  return { error };
}

//get one game with id
export async function getGameById(id) {
  const { data, error } = await supabase
    .from("games")
    .select("*")
    .eq("id", id)
    .single();

  return { data, error };
}

