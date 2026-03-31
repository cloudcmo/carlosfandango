const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("d MMMM yyyy");
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  eleventyConfig.addFilter("excerpt", (content, wordCount) => {
    if (!content) return "";
    const n = wordCount || 25;
    const text = content
      .replace(/(<([^>]+)>)/gi, "")
      .replace(/[#*`[\]()!]/g, "")
      .replace(/\s+/g, " ")
      .trim();
    const words = text.split(" ");
    return words.slice(0, n).join(" ") + (words.length > n ? "…" : "");
  });

  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md").reverse();
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
