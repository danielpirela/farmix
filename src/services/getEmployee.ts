import { supabaseClient } from "@lib/supabase"

export const getEmployee = async (email: string | null) => {
  const supabase = await supabaseClient()

  if (email === null) {
    const { data: Employee } = await supabase
      .from("employees")
      .select("*, roles(role_name)")

    return Employee
  }

  const { data: Employee } = await supabase
    .from("employees")
    .select("*, roles(role_name)")
    .single()

  if (!Employee) return null
  return Employee
}
