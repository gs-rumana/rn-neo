// rn-neo needs no native setup: Checkbox draws its tick instead of using an icon font.
// This no-op stays so apps that still list "rn-neo" under Expo plugins keep building.
module.exports = (config) => config;
