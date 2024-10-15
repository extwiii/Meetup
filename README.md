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

13 - Create `AuthProvider` and implement auth flow

-------------------- Fifth Commit --------------------

14 - Create `Profile` screen to let user to update their details

-------------------- Sixth Commit --------------------

15 - _SUPABASE:_ Create `events` table with below details.

```
id: already exist
title: text, not nullable
description: text
date: timestampz
location: text
image_uri: text
user_id: foreign key to profiles.id, updated -> Cascade, removed -> Set NULL
```

16 - _SUPABASE:_ Use ChatGPT to generate some event via SQL Editor, sample query like below

```
INSERT INTO events (id, title, description, date, location, image_uri) VALUES (1, 'React Native Workshop', 'Learn the basics of React Native and build your first app.', '2024-10-10T14:00:00+00:00', 'Tech Hub, Barcelona', 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/1.jpg');
```

16 - _SUPABASE:_ Add RLS policy called `Enable read access for all users`

17 - Update `(tabs)/index` to fetch events from DB and also `[id].tsx` page to fetch single event from DB too

-------------------- Seventh Commit --------------------

18 - _SUPABASE:_ Create `attendance` table with below details to have MANY to MANY relationship

```
id: already exist
user_id: not nullable, foreign key to profiles.id, updated -> Cascade, removed -> Cascade
event_id: not nullable, foreign key to events.id, updated -> Cascade, removed -> Cascade
```

19 - _SUPABASE:_ Add RLS policies called `Enable insert for authenticated users only` and `Enable read access for all users`

20 - Update `[id].tsx` to insert RSVP clicks to attendence DB

21 - Create `[id]` folder and move existing logic there, and also create `attendance` screen to show who is attending.

-------------------- Eighth Commit --------------------

22 - Install `npm install react-native-date-picker`

23 - Run `npx expo prebuild --clean` to create a prebuild and then run `npx expo run ios` to create an ios build

24 - Create new route `(tabs)/create` and implement creation of events

25 - _SUPABASE:_ Add RLS policy called `Enable insert for authenticated users only`

-------------------- Ninth Commit --------------------

26 - Generating types -> https://supabase.com/docs/guides/api/rest/generating-types -> follow cli version for this

27 - Create a file `types/supabase.ts` and run `npx supabase gen types typescript --linked > types/supabase.ts` to generate types from supabase

28 - Use types in the `utils/supabase.ts` like below

```
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey {...})
```

-------------------- Tenth Commit --------------------

29 - Run `npx expo install expo-image-picker` to install image picker

30 - Create Avatar components, copied from link of Step 6

31 - Run `npx expo prebuild` to create prebuild version and then run `npx expo run ios` to run on simulator

32 - Update `app.json` with below details

```
"plugins": [
  "expo-router",
  [
    "expo-image-picker",
    {
      "photosPermission": "The app accesses your photos to let you share them with your friends."
    }
  ]
],
```

-------------------- Eleventh Commit --------------------

33 - Create `SupaImage` component to render images from supabase storage

-------------------- Twelfth Commit --------------------

34 - _SUPABASE:_ Follow -> https://supabase.com/docs/guides/database/extensions/postgis?language=js&queryGroups=language to use GEO data in Postgres with PostGiS (extensions is the one not gis)

35 - _SUPABASE:_ Add new column called `location_point` to `events table`

36 - _SUPABASE:_ Create index to speed things up, paste below code to SQL Editor

```
create index events_geo_index
  on public.events
  using GIST (location_point);
```

37 - _SUPABASE:_ Create Nearby Events database function

```
CREATE OR REPLACE FUNCTION nearby_events(lat FLOAT, long FLOAT)
RETURNS TABLE (
  id          public.events.id%TYPE,
  created_at  public.events.created_at%TYPE,
  title       public.events.title%TYPE,
  description public.events.description%TYPE,
  date        public.events.date%TYPE,
  location    public.events.location%TYPE,
  image_uri   public.events.image_uri%TYPE,
  user_id     public.events.user_id%TYPE,
  lat         FLOAT,
  long        FLOAT,
  dist_meters FLOAT
)
LANGUAGE sql
AS $$
  SELECT
    id,
    created_at,
    title,
    description,
    date,
    location,
    image_uri,
    user_id,
    ST_Y(location_point::geometry) AS lat,
    ST_X(location_point::geometry) AS long,
    ST_Distance(location_point, ST_Point(long, lat)::geography) AS dist_meters
  FROM
    public.events
  ORDER BY
    location_point <-> ST_Point(long, lat)::geography;
$$;

```

38 - Then call `nearby_events` from `(tabs)/index`

```
const { data, error } = await supabase.rpc('nearby_events', { lat, long });
```

39 - Run `Step 27` to generate types again

-------------------- Thirteenth Commit --------------------

40 - Follow `https://docs.expo.dev/versions/latest/sdk/location/` to Install `expo-location`

41 - Update `(tabs)/index` and Run `Step 23` to create a new build again

-------------------- Fourteenth Commit --------------------

## Misc

- Expo icons -> https://icons.expo.fyi

## Credits

[Full Stack Meetup Clone with React Native, Expo and Supabase](https://www.youtube.com/watch?v=amM52EADmRY)
[Meetup Clone with React Native: Advanced Backend, Maps, GEO Filtering](https://www.youtube.com/watch?v=R2L5x8i3FJI)
