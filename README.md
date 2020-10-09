# react-native-simple-notification
A simple yet elegant notification component to alert users in the app.


# Features

* Customize image, title and description text
* Draggable and dismissable
* Make it static or define how long it is shown
* Multi-notification support
* Design inspired by native iOS notifications
* Built to work with Expo

# Usage

Import the Notification component
```
import Notification from "react-native-simple-notification"
```

Add the ```<Notification>``` component to the parent view container, prefferably and give it a ```ref```
```

import * as React from 'react';

// for class based components
export default class App extends React.Component {

    componentDidMount() {
        this.notification.setActive(true, 3000, "https://logoURL.com/logo.png", "Title", "A very very very long description :)")
    }

    render() {
        return (
            <View>
               <Notification ref={ref => this.notification = ref} />
            </View>
        )
    }

}

// -+- //

// for functional components
export default function App() {
    let notification = React.useRef(null)
    
    React.useEffect(() => {
        notification.setActive(true, 3000, "https://logoURL.com/logo.png", "Title", "A very very very long description :)")
    })

    return (
        <View>
            <Notification ref={notification} />
        </View>
    )
}

```

```setActive()``` function works as follows:
```
setActive(value:boolean, time:number, logoURL:string, title:string, description:string)
// value is either true to show notification or false to hide notification
// time is time in milliseconds for the notification to be shown. Set to 0 if you want it to be dismissed by the user
// logoURL is the URL of the image you want
// title is title shown on top
// description is description shown below the title
```



# Dependencies
* [Galio-Framework](https://github.com/galio-org/galio-org.github.io)
* [Expo-Constants](https://github.com/expo/expo-constants)

# Installation
```npm install react-native-simple-notification```
If you're installing this in a [bare React Native app](https://docs.expo.io/introduction/managed-vs-bare/), you should also follow these [additional installation instructions](https://github.com/expo/expo/tree/master/packages/expo-constants).

# Future Plans

- [ ] Move away from Galio Framework dependency
- [ ] Add custom styling
- [ ] Add Typescript support
- [ ] Add actions controllable with gesture swipes
