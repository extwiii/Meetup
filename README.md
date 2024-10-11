# Meetup

A full-stack universal Meetup app for web and mobile

- React Native
- Expo
- Expo Router
- Nativewind
- Supabase

## SS

## Documentation

1 - Run this command `npx create-expo-stack@latest` and select options you like or run below command to match with this project

`npx create-expo-stack@latest Meetup --expo-router --tabs --nativewind --supabase`

2 - Create dummy data at `assets/events.json` until we set up Supabase with below format, ChatCPT can generate this easily.

```
[
  {
    "id": "1",
    "title": "React Native Workshop",
    "description": "Learn the basics of React Native and build your first app.",
    "datetime": "2024-10-10T14:00:00",
    "location": "Tech Hub, Barcelona",
    "image": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/1.jpg"
  },
  ...,
  ...,
]
```

-------------------- First Commit --------------------

3 - Create `EventListItem` component and render events with FlatList at `(tabs)/index.tsx`

-------------------- Second Commit --------------------

4 - Install `npm install dayjs` and use at `EventListItem`

-------------------- Third Commit --------------------

5 - Create a dynamic route called `[id].tsx` and add press action to `EventListItem` to link it.

-------------------- Forth Commit --------------------

6 - _SUPABASE:_ Go and follow this documentation to set up -> https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native?queryGroups=auth-store&auth-store=async-storage

7 - _SUPABASE:_ Go to dashboard and create a new project called `Meetup`

8 - _SUPABASE:_ Go to SQL Editor -> Quickstarts and select `User Management Starter`

9 - _SUPABASE:_ Alternatively, Run `npx supabase init` and `supabase link --project-ref <project-id>` and then `supabase db pull` to pull local version of DB. Need to have Docker to pull it. Please see for more detail: [Set up the database schema](https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native?queryGroups=auth-store&auth-store=async-storage#set-up-the-database-schema)

10 - _SUPABASE:_ Go to the `API Settings` page in the Dashboard. Get `Project URL` and `anon` to update `.env` file

11 - Create `(auth)/login` file with basic login page and redirect from `(tabs)/layout`

12 - _SUPABASE:_ Go to the `Authentication -> Providers` and select Email to disable `Confirm email`

13 - Creat `AuthProvider` and implement auth flow

-------------------- Fifth Commit --------------------

## Misc

- Expo icons -> https://icons.expo.fyi
