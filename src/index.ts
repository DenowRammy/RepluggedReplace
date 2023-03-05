import { Injector, common } from "replugged";

const inject = new Injector();

const regexesOut = [
  {
    regex: new RegExp(/\/((www|m).)?twitter.com/, "gi"),
    replace: "/fxtwitter.com",
  },
  {
    regex: new RegExp(/\/((www|m).)?reddit.com/, "gi"),
    replace: "/libreddit.spike.codes",
  },
  {
    regex: new RegExp(/\/yewtu.be/, "gi"),
    replace: "/youtube.com",
  },
];

export async function start(): Promise<void> {
  inject.after(common.messages, "sendMessage", (args) => {
    let { content } = args[1];
    let altered = false;
    //check if content matches any of the regexes_out
    for (let i = 0; i < regexesOut.length; i++) {
      if (content.search(regexesOut[i].regex) !== -1) {
        content = content.replace(regexesOut[i].regex, () => {
          return regexesOut[i].replace;
        });
        altered = true;
      }
    }
    if (altered) args[1].content = content;
    return args;
  });
}

export function stop(): void {
  inject.uninjectAll();
}
