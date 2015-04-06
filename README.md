<div>
    <h2>MULTICOLORPICKER PLUGIN v1.0.1</h2>
    <br>
    <p>A simple JQuery plugin. </p>

    <img src="MultiColorPicker.gif">


    <h2>Installation</h2>
    <br>
    <h4>1. Copy MULTICOLORPICKER PLUGIN files to your app.</h4><br>
    <h4>2. Include script after the jQuery library:</h4>
    <pre>"<"<span class="pl-ent">script</span><span class="pl-e">src</span>"="<span class="pl-s"><span class="pl-pds">"</span>"//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"<span class="pl-pds">"</span></span>"></"<span class="pl-ent">script</span>">"<br>
        <h4>3. Add styles to the head section of your webpage:</h4>
    <div class="highlight highlight-html"><pre>"<"<span class="pl-ent">link</span> href="/path/to/multiColorPicker.css" rel="stylesheet"></pre></div><br>
            <h4>4. Initialize plugin</h4>
    <p>Add simple html to the body of your webpage:</p>
    <div class="highlight highlight-html"><pre>"<"<span class="pl-ent">div</span> data-element="multicolorpicker"><<span class="pl-ent">/div</span>></pre></div><br>
    <p>Add initialize script:</p>
    <div class="highlight highlight-html"><pre>"<"<span class="pl-ent">script</span> type="text/javascript" language="javascript">
        $(document).ready(function () {
            $('[data-element="multicolorpicker"]').multicolorpicker();
        });"<"<span class="pl-ent">/script</span>></pre></div><br>

    <h2>Settings</h2>
    <br>
    <p>Add to initialize script "multicolorpicker({'option':'value'});". If parameters don't set, plugin use the defaults.</p>
    <div class="highlight highlight-html"><pre>
            <p>pinStartValue   : 0 //set start position</p>
            <p>pinMidValue     : 0.5 //set middle position</p>
            <p>pinEndValue     : 1 //set end position</p>
            <p>pinStartColor   : #ff0509 //set color RGB</p>
            <p>pinMidColor     : #fff605 //set color RGB</p>
            <p>pinEndColor     : #0026ff //set color RGB</p>
            <p>size            : 350 //set scrollbar-size(px)</p></pre></div>

    <h2>Requirements</h2>
    <br>
    <ul>
        <li>"jquery": "2.1.3"</li>
        <li>"bootstrap": "3.3.2"</li>
        <li>"jquery-ui": "1.11.4"</li>
        <li>"mjaalnir-bootstrap-colorpicker": "2.1"</li>
    </ul>
</div>

