/**
 * @param {string} svg
 * @param {Object} values
 * @returns {string}
 */
function buildSvg(svg, values = {}) {
	if (!svg || typeof svg !== "string" || svg.length === 0) {
		throw new Error("SVG has incorrect format");
	}

	if (Object.keys(values).length === 0) return svg;

	const prefix = "{{";
	const suffix = "}}";

	try {
		for (const [key, value] of Object.entries(values)) {
			if (Array.isArray(value)) {
				const bracket = `<!--${key}-->`;
				let prefixIndex = svg.indexOf(bracket);
				let suffixIndex = svg.indexOf(bracket, prefixIndex + bracket.length);
				if (prefixIndex >= 0 && suffixIndex >= 0) {
					suffixIndex += bracket.length;
					const template = svg
						.slice(prefixIndex + bracket.length, suffixIndex - bracket.length)
						.trim();
					const contentArray = [];
					for (const item of value) {
						let line = template;
						for (const [itemKey, itemValue] of Object.entries(item)) {
							line = line.replace(`{${itemKey}}`, itemValue);
						}
						contentArray.push(line);
					}
					const content = contentArray.join("");
					svg = svg.slice(0, prefixIndex) + content + svg.slice(suffixIndex);
				}
			}
			if (value.includes("\n")) {
				const valueTrim = value.split("\n");

				const openTag = "<";
				const closeTag = ">";

				let keyIndex = svg.length;

				while (keyIndex >= 0) {
					keyIndex = svg.lastIndexOf(key);
					if (keyIndex < 0) break;
					const openTagIndex = svg.lastIndexOf(openTag, keyIndex);
					const closeTagIndex = svg.indexOf(closeTag, keyIndex);
					if (openTagIndex < 0 || closeTagIndex < 0) break;
					const tag = svg.slice(openTagIndex, closeTagIndex + 1);
					const content = valueTrim
						.map((v) => tag.replace(prefix + key + suffix, v))
						.join("");
					svg = svg.replace(tag, content);
				}
			} else svg = svg.replaceAll(prefix + key + suffix, value);
		}

		return svg;
	} catch (e) {
		console.log(e);
		throw new Error("SVG processing error");
	}
}

module.exports = buildSvg;
