import { supabaseClient } from "@lib/supabase"

export const getEmployee = async (email: string) => {
  const supabase = await supabaseClient()
  const { data: Employee } = await supabase
    .from("employees")
    .select("*")
    .eq("email", email)
    .single()

  if (!Employee) return null
  return Employee
}
