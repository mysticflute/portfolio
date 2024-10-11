# Projects Data

This directory contains the data for music projects.

## Adding New Projects

1. Copy the `_template.yaml` file and rename it.
2. Edit the copied yaml file with the relevant information.
3. Uploading tracks to Cloudinary:
   1. Go to the [Cloudinary Media Library](https://console.cloudinary.com/console/media_library).
   2. Optionally select the `Folders` tab, then open the `audio` folder.
   3. Click the Upload button.
   4. Select the `16bit 44khz wav` file from the local filesystem.
   5. Choose the `audio_track` preset under `Advanced` dropdown.
   6. After the upload finishes processing, find the track URLs under the Media Explorer:
      1. Click on `Programmable Media` on the far left tab bar.
      2. Click on `Media Explorer`.
      3. Navigate to and select the uploaded file(s).
      4. Click on the `Optimize and Deliver` tab.
      5. The `mp3` and `aac` urls should have been eagerly generated based on the `audio_track` preset settings. Copy these urls to the yaml config file.

## Disabling a Project

1. Rename the yaml file to start with an underscore, e.g., `_project.yaml`.
