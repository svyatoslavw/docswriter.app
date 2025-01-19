import { usersApi } from "@/shared/api/services/users-api"

export default async function Profile() {
  const data = await usersApi.profile()
  if (!data) return null

  return (
    <main>
      <h1>Profile</h1>
      <div>{data.email}</div>
    </main>
  )
}
