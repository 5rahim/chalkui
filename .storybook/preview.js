import {addDecorator}                         from "@storybook/react";
import {ChalkProvider, ColorModeToggleButton} from "../chalk/React";
import React                                  from "react";
import {ColorModeScript}                      from "../chalk/ColorMode";
import theme                                  from "../stories/CustomTheme";

export const parameters = {
    actions: {argTypesRegex: "^on[A-Z].*"},
}

addDecorator(story => (
    <ChalkProvider theme={theme}>
        <ColorModeScript />
        {story()}
        <ColorModeToggleButton />
    </ChalkProvider>
))
