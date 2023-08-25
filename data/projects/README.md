# Project Listing

This directory contains the data for music projects.

## Adding New Projects

1. Copy the `_template.yaml` file and rename it.
2. Edit the copied yaml file with the relevant information.
3. To find SoundCloud track IDs:

   1. Load the track page on soundcloud.com.
   2. Click the "Share" button.
   3. Click the "Embed" tab.
   4. Copy the code and paste it in a text editor.
   5. Copy the ten digit code that comes after the `/tracks` part of the src URL.<br/>
      For example, ...api.soundcloud.com/tracks/**1272228361**&color...

4. Add project images to the `public/images/project` directory.
5. If applicable, add new client logo images to the `public/images/logo` directory.

## Disabling a project

1. Rename the yaml file to start with an underscore, e.g., `_project.yaml`.
