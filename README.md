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

## Misc

- Expo icons -> https://icons.expo.fyi
