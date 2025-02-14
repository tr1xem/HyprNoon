const { Gtk } = imports.gi;
import Widget from "resource:///com/github/Aylur/ags/widget.js";
import Indicators from "../normal/spaceright.js";
import ScrolledModule from "../../.commonwidgets/scrolledmodule.js";
import Clock from "../modules/clock.js";
import BatteryScaleModule from "../modules/battery_scale.js";
import NormalOptionalWorkspaces  from "../normal/workspaces_hyprland.js";
import media from "../modules/media.js";
import Battery from "../modules/battery.js";
import FocusOptionalWorkspaces  from "../focus/workspaces_hyprland.js";
const expand = () => Widget.Box({ hexpand: true, css: "min-height:0.5rem" });

export const FloatingBar = Widget.CenterBox({
  className: "bar-floating",
  css: `margin: ${userOptions.asyncGet().bar.floatingElevation}rem ${userOptions.asyncGet().bar.floatingWidth}rem;min-height:2.5rem;padding:0.3rem 0`,
  startWidget: Widget.Box({
    css: "margin-left:1.8rem;",
    children: [
      Battery(),
	    ScrolledModule({
        children: [
          ...(userOptions.asyncGet().bar.elements.showWorkspaces ? [await NormalOptionalWorkspaces()] : []),
          ...(userOptions.asyncGet().bar.elements.showWorkspaces ? [await FocusOptionalWorkspaces()] : []),
        ],
      }),
    ],
  }),
  centerWidget: ScrolledModule({
    hpack:"center",
    hexpand: true,
    children: [
      ...(userOptions.asyncGet().bar.elements.showClock ? [Clock()] : []),
      expand(),
	    media(),
      Widget.Box({ children: [expand(),BatteryScaleModule()] }),
    ],
  }),
  endWidget:
  Widget.Box({
    children:[
      expand(),
      ScrolledModule({
        children: [
          ...(userOptions.asyncGet().bar.elements.showIndicators ? [Indicators()] : []),
        ],
      }),
    ]
  })
});
