// Config for Eleventy
export default async function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy("mh-linux-patch/*.xdelta");
	eleventyConfig.addPassthroughCopy("mh-linux-patch/rom-patcher-js");
};
