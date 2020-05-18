/**
 * "Slugify" a string
 * Credits: https://gist.github.com/mathewbyrne/1280286
 *
 * @param string
 */
const slugify = (string) =>
  string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');

module.exports = slugify;
