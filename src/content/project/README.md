## LiDAR-to-Heightmap Beginner Tutorial

***

A beginner-friendly, reproducible workflow for turning **LiDAR data into heightmaps, basemaps, and tree placement maps for BeamNG.drive**.

Additional **screenshots and download links** for maps can be found [**here**](/LiDAR-to-Heightmap-Tutorial-Website/resources/01-downloads-and-more-examples/).

The complete project files, scripts, and example data used in this tutorial are available on GitHub.

[**View the Project Repository**](https://github.com/KingStu90/LiDAR-to-Heightmap-Beginner-Tutorial) →

[**Start the Tutorial**](/LiDAR-to-Heightmap-Tutorial-Website/tutorial/01-downloading-point-cloud-data/) →

<table>
  <thead>
    <tr>
      <th colspan="2" style="text-align: center;">Examples: In-Game Screenshots</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center; width: 50%;">
        <img src="/LiDAR-to-Heightmap-Tutorial-Website/photos/98_dirtfish_1.webp" alt="DirtFish Rally School, WA" style="width: 100%;">
        <br><em>DirtFish Rally School, WA</em>
      </td>
      <td style="text-align: center; width: 50%;">
        <img src="/LiDAR-to-Heightmap-Tutorial-Website/photos/99_swing_arm_city_1.webp" alt="Swing Arm City, UT" style="width: 100%;">
        <br><em>Swing Arm City, UT</em>
      </td>
    </tr>
    <tr>
      <td style="text-align: center; width: 50%;">
        <img src="/LiDAR-to-Heightmap-Tutorial-Website/photos/98_seattle_golf_club_1.webp" alt="Seattle Golf Club, WA" style="width: 100%;">
        <br><em>Seattle Golf Club, WA</em>
      </td>
      <td style="text-align: center; width: 50%;">
        <img src="/LiDAR-to-Heightmap-Tutorial-Website/photos/99_crater_lake_1.webp" alt="Crater Lake, OR" style="width: 100%;">
        <br><em>Crater Lake, OR</em>
      </td>
    </tr>
    <tr>
      <td style="text-align: center; width: 50%;">
        <img src="/LiDAR-to-Heightmap-Tutorial-Website/photos/99_eureka_dunes_scaled_1.webp" alt="Eureka Dunes, CA" style="width: 100%;">
        <br><em>Eureka Dunes, CA</em>
      </td>
      <td style="text-align: center; width: 50%;">
        <img src="/LiDAR-to-Heightmap-Tutorial-Website/photos/98_old_dominion_university_1.webp" alt="Old Dominion University, VA" style="width: 100%;">
        <br><em>Old Dominion University, VA</em>
      </td>
    </tr>
  </tbody>
</table>

***

### Who This Is For

**I did my best to write this tutorial for the person I was when I started**. Because of this, the tutorial is fairly in-depth. There are a lot of tutorials about Geographic Information Systems (GIS) and processing LiDAR data, **but it can be difficult to know what to search for when you don't know the basic terminology**. 

My goal with this tutorial is to **provide a reproducible workflow** while introducing the GIS concepts along the way. This is **not intended to be the definitive way** to process LiDAR data. It is the workflow that worked for me, and different datasets may require different tools, settings, or approaches. The tutorial provides **downloadable example data** so you can follow along **step-by-step**, while also showing how the **same workflow and code** can be adapted to your own project.

***

### What This Tutorial Does

The part I found most frustrating was spending so much time **manually recreating things that were already contained in the LiDAR data**. Manually placing trees was especially time-consuming, and using roads as a method to smooth the terrain didn't seem like the ideal way to create a track that was accurate to real life. It is very difficult to preserve the original camber and elevation when manually modifying the terrain.

Discovering the [**Biome Tool**](https://documentation.beamng.com/world_editor/tools/biome_tool/) in the World Editor was the **starting point for this project**. It allows you to place objects and vegetation using a grayscale mask. After experimenting with different LiDAR processing software, **I developed a repeatable method for extracting tree locations from LiDAR data and creating a tree placement map** that could be used with the Biome Tool ([**detailed explanation**](/LiDAR-to-Heightmap-Tutorial-Website/tutorial/13-isolating-trees/)). 

For an additional way to explore the processed tree-only data, I created a web-based 3D point-cloud viewer using Potree: [**Interactive Viewer**](https://kingstu90.github.io/LiDAR-to-Heightmap-Tutorial-Website/potree/examples/ridge_motorsports_park_trees_only.html)

**I also needed a way to reduce the force-feedback noise without manually smoothing the terrain.** My solution was to scale the LiDAR data to **50%** before generating the heightmap, and then return the terrain back to its original scale in the BeamNG World Editor ([**detailed explanation**](/LiDAR-to-Heightmap-Tutorial-Website/tutorial/08-scale-50/)).

In addition, the ground-only processed data is also available as a subsampled point cloud in the Potree viewer: [**Interactive Viewer**](https://kingstu90.github.io/LiDAR-to-Heightmap-Tutorial-Website/potree/examples/ridge_motorsports_park_ground_only_subsample.html)

**Finally, I wanted to eliminate the need to hand-paint the terrain**. The main problem I encountered when using imagery such as Google Maps for a basemap was that the imagery and heightmap could become increasingly misaligned over a large area. **To solve this, I colorize the point cloud with the imagery and then create the basemap from the colorized point cloud** ([**detailed explanation**](/LiDAR-to-Heightmap-Tutorial-Website/tutorial/11-creating-the-basemap-cloudcompare/)).

One ***potential*** way this project could be expanded is by using **LiDAR data to place material layers** (grass, dirt, asphalt, etc.) similar to the [**layer-map**](https://community.bohemia.net/wiki/Layered_Terrain_Surface_Representation?useskin=darkvector&utm_source) apprroach used in the Arma series. The World Editor can **export layer maps** for individual materials (*shown below*), but I haven't figured if there is a way to import them. Depending on the dataset, however, it **may be possible to extract information from LiDAR data that could be used to automatically create material masks**. 

<figure style="text-align: center; margin: auto;">
  <img
    src="/LiDAR-to-Heightmap-Tutorial-Website/photos/00_layermap_grass.webp"
    alt="Hand painted grass layer"
    style="max-width: 50%; height: auto;"
  >
  <figcaption style="margin-top: 8px; font-style: italic;">
    Hand Painted Grass Layer
  </figcaption>
</figure>

>[!NOTE]
>**Point cloud** in this tutorial refers to `.laz` or `.las` files.
>
>**Imagery** or **raster** refers to `.tif`, `.tiff`, or `.geotiff` files.

<div align="center">
  <img
    src="/LiDAR-to-Heightmap-Tutorial-Website/photos/00_workflow.svg"
    alt="Workflow mermaid chart"
    style="max-width: 100%; height: auto;"
  >
</div>

***

### Requirements

>[!IMPORTANT]
>All of the steps in the tutorial provide a “**Native Execution**” command which **requires the user to have the program used by that step installed on their PC**.
>
>There is also a “**Docker Execution**” command which requires **Docker**. The advantage of using Docker is that the programs and dependencies used by the Docker workflow are installed in a self-contained environment, **so you don’t have to install and configure each program separately**.

### Native Execution

All of the software used in the tutorial is listed below and is free to download.

- [**CloudCompare**](https://www.cloudcompare.org/) (*Required*) - 3D point cloud and mesh analysis tool 

- [**PDAL**](https://pdal.io/) (*Required*) - Point cloud processing and translation software

- [**GDAL**](https://gdal.org/en/stable/download.html) (*Required*) - Geospatial raster and vector data library

- [**Miniconda**](https://docs.conda.io/projects/conda/en/latest/user-guide/install/index.html) (*Highly Recommended)* - Recommended package manager for installing PDAL, GDAL, and their dependencies 

- [**QGIS**](https://www.qgis.org/download/) (*Recommended*) - Desktop GIS and mapping software

- [**GIMP**](https://www.gimp.org/downloads/) - (*Highly Recommended*) - Image editor 

- [**LAStools**](https://rapidlasso.de/downloads/) (*Optional*) - LiDAR processing software with a mix of **free and paid tools**. Alternative method for merging large datasets

- [**Obsidian**](https://obsidian.md/download) - (*Optional*) - Note-taking app, good for storing notes and code 

*Depending on your operating system and what dependencies are installed, you may need to do some troubleshooting to get all the programs working correctly*.

### Docker Execution

*The Docker workflow is primarily intended for Linux users. Docker Desktop can run Linux containers on Windows using WSL 2, but this tutorial does not currently provide Windows-specific Docker instructions and I have not tested the Docker workflow on Windows.*

If you want to use the Docker workflow, install Docker first:

[**Download Docker**](https://www.docker.com/get-started/)

After installing Docker, open a terminal and navigate to the root directory of the project (the directory containing the Dockerfile and run_pipeline.sh).

Build the Docker image with:

```bash
docker build -t lidar-pipeline .
```

Then make the pipeline script executable:

```bash
chmod +x run_pipeline.sh
```

Individual processing scripts can then be run through Docker:

```bash
./run_pipeline.sh 01_download.sh
```

>[!NOTE]
>To run the 'Docker Execution' commands **with your own project data**, edit the `.sh` text files found in the `03_scripts` directory.

***

### Why I Made This

I originally got interested in making **a track from LiDAR data** a couple of years ago after coming across this [**tutorial**](https://assettocorsamods.net/threads/track-building-series.1796/) for Assetto Corsa. Following the tutorial, I managed to get some roads imported into the simulator. However, **the majority of the actual map creation was done in Blender**, and I didn't have the time or motivation to learn Blender just to drive around a local track.

Fast forward to this year: I made the switch to Linux, and BeamNG.drive is one of the few driving sims I own that is supported on Linux, so it became my main driving sim. After finding out that BeamNG has its own **World Editor, which allows you to build maps in-game**, I decided to take another shot at making a map from LiDAR data. With the help of this [**tutorial**](https://www.beamng.com/threads/tutorial-level-building-with-lidar.39370/), I managed to create a heightmap and import it into the World Editor. After **spending 100+ hours** on my first map (*shown below*), manually placing the roads and trees, and hand-painting all the terrain, **the map was still far from finished**. 

<table>
  <tr>
    <th colspan="2" align="center">Initial Manual Approach (100+ hrs)</th>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img src="/LiDAR-to-Heightmap-Tutorial-Website/photos/00_ridge_motorsports_park_1.webp"  
      alt="Ridge Motorsports Park, WA — initial manual approach"
      width="100%">
    </td>
    <td align="center" width="50%">
      <img src="/LiDAR-to-Heightmap-Tutorial-Website/photos/00_ridge_motorsports_park_3.webp" 
      alt="Ridge Motorsports Park, WA — initial manual approach"
      width="100%">
    </td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2" align="center">Final Results: Ridge Motorsports Park, WA</th>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img src="/LiDAR-to-Heightmap-Tutorial-Website/photos/00_ridge_motorsports_park_5.webp" 
      alt="Final Results: Ridge Motorsports Park, WA"
      width="100%">
    </td>
    <td align="center" width="50%">
      <img src="/LiDAR-to-Heightmap-Tutorial-Website/photos/00_ridge_motorsports_park_6.webp" 
      alt="Final Results: Ridge Motorsports Park, WA"
      width="100%">
    </td>
  </tr>
  <tr>
    <td colspan="2" align="center">
      <em>Trees placed with BeamNG.drive Biome Tool</em>
    </td>
  </tr>
</table>

***

### Start Tutorial

[**Step 1: Downloading LiDAR Data**](/LiDAR-to-Heightmap-Tutorial-Website/tutorial/01-downloading-point-cloud-data/) →

***

### Map Downloads & More Examples 

[**Final Results**](/LiDAR-to-Heightmap-Tutorial-Website/resources/01-downloads-and-more-examples/) →

### LiDAR Data and Other Resources

[**Useful Resources**](/LiDAR-to-Heightmap-Tutorial-Website/resources/02-lidar-data-and-other-resources/) →

### Citations and Attribution

[**Sources**](/LiDAR-to-Heightmap-Tutorial-Website/resources/03-citations-and-attribution/) →

***

### About Me

I enjoy building things, figuring out how they work, and finding ways to solve problems with the tools and information available.

When I first started working with LiDAR data, my goal was simply to create a heightmap for a BeamNG.Drive map. I saw this project as a way to give something back to the modding and open-source communities that I've benefited from over the years. As I built the project, I realized how much I enjoyed working with LiDAR data. I found it interesting how much information could be extracted from a single dataset and how that information could be used to solve different problems. Rather than manually deciding where things like trees should go or how terrain should be shaped, I found it much more interesting to figure out how the data could make those decisions for me.

My interest in LiDAR also connects with my interest in drones. I originally got my Part 107 license to do FPV filming. While I enjoyed building and flying drones, I found that the artistic side of planning shots and editing footage wasn't as interesting to me as experimenting with different drone builds. Discovering the GIS field and learning to build pipelines to process LiDAR data has given me another way to explore my interest in drones beyond filming.

*Disclaimer: This project has been a valuable experience in learning to write, understand, and apply code to real-world GIS workflows. I used the free version of ChatGPT to help with the majority of the scripts. **However, it took considerable planning, modifying, and testing to ensure they worked across multiple use cases**. I have intentionally kept the “Native Execution” commands as simple and transparent as possible so that users with limited programming experience can understand what each script is doing.*

***

### Feedback & Support

If you find an issue with the tutorial, have a question, or have feedback on the workflow, I'd be happy to hear from you at <b>kingstuart75@gmail.com</b>.

*Please don't send file attachments. I can't guarantee that I will open files or links sent by email.*

If the tutorial helped you out and you'd like to support the project, the easiest way is to **share the link** with someone who might find it useful. You can also **buy me a coffee**.

<script type="text/javascript" src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js" data-name="bmc-button" data-slug="StuartKing" data-color="#FFDD00" data-emoji="" data-font="Cookie" data-text="Buy me a coffee" data-outline-color="#000000" data-font-color="#000000" data-coffee-color="#ffffff" ></script>

***
