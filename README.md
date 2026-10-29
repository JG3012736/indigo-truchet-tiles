# Mixed Media Generative Patterns with Indigo

A truchet tiling algorithm I wrote in p5.js, based on my own styling heuristics, brought into the physical world as a hand screen printed, indigo dyed fabric. The final tiles were exported from code, cut on a Cricut, and printed onto fabric with a soy paste resist.

**Try it on OpenProcessing:** [Final tile design](https://openprocessing.org/sketch/2510544) · [Iteration 1](https://openprocessing.org/sketch/2510432) · [Iteration 2](https://openprocessing.org/sketch/2510435)

## Controls

* **Generate a new pattern:** refresh the page, or press the restart button on OpenProcessing. Every run uses new noise values, so each pattern is different.
* **Save the final tile as an SVG:** on the [final version](https://openprocessing.org/sketch/2510544), click once on the sketch so it can read your keyboard, then press `s`. It downloads `myPattern.svg`.

![The final indigo dyed fabric](media/final-fabric.jpg)

* **Built with:** JavaScript, p5.js, p5.js-svg, Cricut, screen printing, soy resist, and indigo dye
* **Features:** hexagonal truchet tiling driven by Perlin noise, where one noise field picks the tile type and a second picks its rotation, layered line weights, and a final block print version that fits the repeatable pattern inside one large hexagonal tile for SVG export
* **Context:** Combined work from Golan Levin's creative coding course and Culture of Color at Carnegie Mellon University, merging my generative code with indigo textile techniques between courses to develop my own self initiated interdisciplinary project.

## Original Proposal

As a refresher, I originally proposed to use my truchet tiling algorithm to create designs (that were based off my own styling heuristics) utilizing p5.js software that would be laser cut or Cricut cut and placed on screens to create a large overarching pattern across my fabric.

My first sketch generated one huge page that would act as the entire fabric. From there, I iterated on the types of patterns I could create.

| Iteration 1 | Iteration 1, new generation |
|---|---|
| ![Simple Truchets sketch](media/iteration1-a.jpg) | ![Simple Truchets sketch, another generation](media/iteration1-b.jpg) |

[View on OpenProcessing: Simple Truchets](https://openprocessing.org/sketch/2510432)

## Redesigning My Proposal

While I liked the style of the lines in my original proposal, I wanted to create something a bit closer to the batik and intricate styles from West Africa and South Asia. Therefore, I went back into my program and created some new conditionals that allowed me to create designs such as the one below as a quick mock up of what I really wanted my final fabric to look like.

![Redesigned pattern mock up](media/redesigned-pattern.jpg)

Along the way I also experimented with different line weights to create a more complicated pattern. I liked some of the generative lines in this sketch since they looked less abstract and more like fine line drawings, but they weren't stylistically what I was going for, which is why I veered off this path.

| Iteration 2 | Iteration 2, new generation |
|---|---|
| ![Truchet Tiles sketch](media/iteration2-a.jpg) | ![Truchet Tiles sketch, another generation](media/iteration2-b.jpg) |

[View on OpenProcessing: Truchet Tiles](https://openprocessing.org/sketch/2510435)

## Reformatting My Files

Finally, in order to bring my project into the physical world, I had to reorganize my code so that it would create simpler tiles made up of two hexagonal tiles so that I could print them out individually and actually hand tile my fabric. This meant moving to more of a block print approach, with the entire repeatable pattern on one singular tile. After that was done, it took a few hours for me to understand how to import a library and create some new functions that would allow me to export these tiles. I made sure to save each image as a separate tile for the overlapping designs.

| Final sketch | Final sketch, new generation |
|---|---|
| ![Final tile sketch](media/final-sketch-a.jpg) | ![Final tile sketch, another generation](media/final-sketch-b.jpg) |

| Exported tile layer 1 | Exported tile layer 2 |
|---|---|
| ![First tile layer](media/tile-layer-1.jpg) | ![Second tile layer](media/tile-layer-2.jpg) |

## Troubleshooting with the Cricut

Originally, I exported the two tiles into two separate layers as SVGs, however the Cricut was cutting the images out as flat lines instead of going around the contours of each line. I suspected this was because it was reading the metadata of the SVG and reformatting it in its own UI. So then, I once again went back to my software and exported the images as separate PNG files that were also transparent. This finally allowed me to use the Cricut to cut around the contours of each line as desired using the single layer mode.

| Cutting tests | Cutting tests | Cricut |
|---|---|---|
| ![Vinyl cutting test](media/svg-cut-test.jpg) | ![Vinyl cutting test](media/png-cut-test.jpg) | ![Cricut cutting the vinyl](media/cricut-cut.jpg) |

## Peeling Off My Results

This was the most time consuming part of the process, delicately peeling off the vinyl parts of where the soy resists would be placed.

| Peeling | Peeled vinyl |
|---|---|
| ![Peeling the vinyl](media/peeling.jpg) | ![Weeded vinyl tiles](media/weeded-vinyl.jpg) |

## Using Contact Paper

Then, I applied contact paper on top of each vinyl design, overlaid it onto a screen, and slowly started to peel off the contact paper from the vinyl while ensuring that the vinyl stayed in place on top of the screen. This final step was also very tedious since the smallest segments of the vinyl wanted to stay stuck onto the contact paper, meaning I would have to go in with the exacto blade and pick them off individually.

![Applying contact paper](media/contact-paper.jpg)

## Formatting My Screens

After getting the first design onto the screen, it was time to repeat the process for the second tile that would act as an additional layer of resist on the fabric. This total process took me about four hours, and then I was finally finished with doing all the prep for this project.

![Vinyl tile on the screen](media/screen.jpg)

## Some Mishaps

Unfortunately, before I had a chance to print with the screens I had formatted, another student had already taken off the designs and used it. Therefore, I had to restart the entire process and chose to significantly simplify my tile designs so as not to waste time peeling off the final this time around. I chose a design with fewer small spaces and more connected lines to make the process as simple and quick as possible.

![Simplified tile design](media/simplified-tile.jpg)

## Finally Printing

Using the soy paste recipe we were taught to use in class, I finally had a new screen formatted and started printing the tile on top of the entire fabric. The motions required for this were very repetitive and easy to do quickly. I simply placed the screen adjacent to where previous tiles had been spaced, laid some soy resist down, made sure to flood the screen, and then dragged the paste throughout the screen again to ensure a crisp outcome. Then, I just waited for the soy resists to dry to around 80%.

| Printing | Printed fabric |
|---|---|
| ![Printing the tile onto fabric](media/printing.jpg) | ![Printed soy resist on fabric](media/printed-fabric.jpg) |

## Dyeing with Indigo

I do not have many images of the first round of dyeing but it was a simple process. I dipped the fabric into the dark indigo dye vat for around 1 minute, rinsed it in another tub for 30 seconds, let it oxidize for 3 minutes, and repeated the process around 5 times. Then I let the entire fabric dry and started screen printing new tiles within all of the empty spaces. I also went in with a very simple paper cut out of a diamond shape and attempted to create an ombre effect by hand on each of the original tiles.

![Dyeing the fabric](media/dyeing.jpg)

## Final Look

I dipped the fabric into the dark dye vat another 5 times following the same procedures. Then, I washed and dried my fabric. Finally, I cleaned my fabric in a tub of slightly heated water and vinegar to bring out the color of the indigo and get rid of the remaining soy paste. While I do not think the ombre was all that successful (I should have applied it before doing my first dips), I really like the effect of the subtle designs between each tile and think this project came out great for my first attempt at a procedure that I created using my own software and tiling techniques.

![Final look of the fabric](media/final-look.jpg)

## Run Locally

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

## Structure

* `index.html`, `mySketch.js`: final block print tile with SVG export
* `development/simple-truchets/`: iteration 1, one huge page acting as the entire fabric
* `development/truchet-tiles/`: iteration 2, line weight and fine line experiments
* `media/`: sketch screenshots and process photos

## Credits

Created by Jenna Gomes. Truchet tiling parameters set by Golan Levin, who also pointed me to the p5.js-svg library. Indigo dye pattern project and basic indigo dyeing techniques taught by my Culture of Color professors, which I then iterated on myself multiple times to adapt the process for the Cricut. Truchet layout referenced from [this tutorial](https://www.youtube.com/watch?v=Qwb2VYrN-us). Perplexity Pro was used for help with the tiling math and for debugging the SVG clipping masks. SVG rendering uses the [p5.js-svg](https://github.com/zenozeng/p5.js-svg) library. Also on [OpenProcessing](https://openprocessing.org/@u498618).
