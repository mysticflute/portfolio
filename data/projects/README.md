# Projects Data

This directory contains the data for music projects.

## Adding New Projects

1. Copy the `_template.yaml` file and rename it.
2. Edit the copied yaml file with the relevant information.
3. To find SoundCloud track URLs:
   1. Ensure the track is enabled for the RSS feed. For each track:
      1. Load the track page on soundcloud.com.
      2. Click Edit > Permissions (tab) > Enable "Include in RSS Feed".
   2. Load the profile's RSS feed:
      1. Find the RSS URL under Profile Settings > Content (tab) > "RSS feed".
         For example, https://feeds.soundcloud.com/users/soundcloud:users:394865898/sounds.rss.
      2. View or download the feed contents (e.g., in Chrome).
   3. For each track, find the `<enclosure>` field's url within the `<item>` tag for the track, and copy this url to the mp3 field of the yaml. Note that the author and title in the URL, after the soundcloud ID, does not seem necessary and can be stripped.

## Disabling a Project

1. Rename the yaml file to start with an underscore, e.g., `_project.yaml`.
