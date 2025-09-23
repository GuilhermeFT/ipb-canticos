# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Android application called "Cânticos Espirituais IPB" (Spiritual Songs IPB) built with Kotlin. The app displays a searchable list of spiritual songs loaded from a JSON file and allows users to view individual song lyrics.

## Build Commands

This project uses Gradle as the build system. Note that the project may have compatibility issues with newer Gradle versions.

**Common Commands:**
- `./gradlew build` - Build the project (may fail with current Gradle setup)
- `./gradlew assembleDebug` - Build debug APK
- `./gradlew assembleRelease` - Build release APK
- `./gradlew test` - Run unit tests
- `./gradlew connectedAndroidTest` - Run instrumented tests

**Note:** The current Gradle configuration appears to have compatibility issues. The project uses:
- Gradle 3.5.3 (Android Gradle Plugin)
- Kotlin 1.3.61
- compileSdkVersion 29
- targetSdkVersion 29

## Architecture

The app follows a simple MVC-like structure:

**Package Structure:**
- `br.gftapps.canticosespirituais.View` - Activities (UI layer)
- `br.gftapps.canticosespirituais.Model` - Data handling and adapters
- `br.gftapps.canticosespirituais.Controller` - Data classes

**Key Components:**

1. **Data Layer:**
   - `GetAssetsMusic.kt` - Utility class that reads JSON files from app assets
   - `canticos.json` - Asset file containing song titles and lyrics arrays
   - `Musica.kt` - Data class representing a song (index, title, lyrics)

2. **UI Layer:**
   - `BeginActivity.kt` - Launch activity (entry point)
   - `MainActivity.kt` - Main list view with search functionality
   - `ShowMusicActivity.kt` - Individual song display
   - `ListMusicAdapter.kt` - ListView adapter for song list

**Data Flow:**
1. App reads `canticos.json` from assets using `GetAssetsMusic`
2. JSON contains parallel arrays: "nomes" (titles) and "letras" (lyrics)
3. Data is parsed into `Musica` objects and displayed via `ListMusicAdapter`
4. Users can search songs and tap to view full lyrics

## Key Implementation Details

- Uses legacy Android View system (pre-Compose)
- Implements text search filtering on song titles
- Stores song data in assets/canticos.json as parallel JSON arrays
- Uses AndroidX libraries and Kotlin Android Extensions (deprecated)
- MultiDex enabled for APK optimization

## Testing

- Unit tests: `app/src/test/`
- Instrumented tests: `app/src/androidTest/`
- Default test runners: JUnit 4 and Espresso