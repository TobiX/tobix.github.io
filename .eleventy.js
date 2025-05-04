// Config for Eleventy
export default async function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy("mh-linux-patch/*.png");
	eleventyConfig.addPassthroughCopy("mh-linux-patch/*.zip");
	eleventyConfig.addPassthroughCopy("mh-linux-patch/rom-patcher-js");
};
