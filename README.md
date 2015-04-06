# MULTICOLORPICKER PLUGIN v1.0.1

A simple JQuery plugin.
<img src="MultiColorPicker.gif">
### Installation

##### 1. Copy MULTICOLORPICKER PLUGIN files to your app


##### 2. Include script after the jQuery library:
```javascript
<script src="/path/to/multiColorPicker.js">script>
```

##### 3. Add styles to the head section of your webpage
```javascript
<link href="/path/to/multiColorPicker.css" rel="stylesheet">
```

##### 4. Initialize plugin

Add simple html to the body of your webpage:
```javascript
<div data-element="multicolorpicker">/div>
```

Add initialize script:
```javascript
<script type="text/javascript" language="javascript">
        $(document).ready(function () {
            $('[data-element="multicolorpicker"]').multicolorpicker();
        });/script>
```

### Settings

Add to initialize script "multicolorpicker({'option':'value'});". If parameters don't set, plugin use the defaults.
```javascript
pinStartValue   : 0 //set start position
pinMidValue     : 0.5 //set middle position
pinEndValue     : 1 //set end position
pinStartColor   : #ff0509 //set color RGB
pinMidColor     : #fff605 //set color RGB
pinEndColor     : #0026ff //set color RGB
size            : 350 //set scrollbar-size(px)
```

### Requirements


 * "jquery": "2.1.3"
 * "bootstrap": "3.3.2"
 * "jquery-ui": "1.11.4"
 * "mjaalnir-bootstrap-colorpicker": "2.1"


