const { Plugin } = require("powercord/entities");
const { getModule } = require("powercord/webpack");
const { inject, uninject } = require("powercord/injector");
const DTXT = require("discord-texts");

module.exports = class MarkHAM extends Plugin {
	async startPlugin() {
		function DTexts(args) {
			let option = args[0];
			let msg = args.slice(1).join(" ");
			if (!msg)
				return {
					send: false,
					result: "Please provide a message for me to send"
				};
			let output;
			if (!option || option.length < 1)
				output = {
					send: false,
					result: `Please provide a valid option`
				};
			switch (option) {
				case "blackout":
					output = DTXT.blackout(msg);
					break;
				case "emojify":
					output = DTXT.emojify(msg);
					break;
				case "fancy":
					output = DTXT.fancy(msg);
					break;
				case "mock":
					output = DTXT.mock(msg);
					break;
				case "pirate":
					output = DTXT.pirate(msg);
					break;
				case "reverse":
					output = DTXT.reverse(msg);
					break;
				case "tiny":
					output = DTXT.tinyText(msg);
					break;
				case "upsidedown":
					output = DTXT.upsidedown(msg);
					break;
				case "vapor":
					output = DTXT.vaporwave(msg);
					break;
				default: {
					return { send: false, result: `${args[0]} is not a valid option` };
				}
			}
			return { send: true, result: output };
		}
		const messageEvents = await getModule(["sendMessage"]);
		inject("mhSend", messageEvents, "sendMessage", function (args) {}, true);
		powercord.api.commands.registerCommand({
			command: "mh",
			description: "owoify your message",
			usage: "{c} [ text ]",
			executor: (args) => DTexts(args),
			autocomplete: (args) => {
				if (args[0] !== void 0 && args.length === 1) {
					return {
						commands: require("./commands.json").cmds,
						header: "MarkHAM Commands"
					};
				}
			}
		});
	}
	pluginWillUnload() {
		uninject("mhSend");
		powercord.api.commands.unregisterCommand("mh");
	}
};
