<h1 class="ng-scope" id="chatterbox">chatterbox</h1>
<p class="ng-scope">This assignment constitutes the beginning of a journey exploring client-server architecture.
Today, you'll build a chat client that allows you to communicate with your fellow students. You'll do this
using <code>$.ajax</code> to send (POST) and fetch (GET) JSON data to and from a remote server.</p>
<h2 class="ng-scope" id="prerequisites">Prerequisites</h2>
<p class="ng-scope">Before you get started, please read this
<a href="http://net.tutsplus.com/tutorials/other/a-beginners-introduction-to-http-and-rest/">brief introduction to about REST and HTTP</a>.</p>
<h3 class="ng-scope" id="browser-security">Browser Security</h3>
<ul class="ng-scope">
<li>Read all about <a href="https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)">Cross-site scripting (XSS)</a>. You may find this
<a href="https://xss-game.appspot.com">Interactive Tutorial on Cross-site scripting (XSS)</a>
or this one on <a href="http://escape.alf.nu/">Escaping html</a> helpful. Note that these tutorials
are pretty hard, you don't have to complete them if you don't find them useful.</li>
</ul>
<h2 class="ng-scope" id="tools-you-ll-use">Tools You'll Use</h2>
<h3 class="ng-scope" id="parse-api">Parse API</h3>
<p class="ng-scope">We've set up a remote server using the <a href="https://parse.com/">Parse</a> platform.
Later (as part of a different sprint) you'll build your own (local) server and replace the
(remote) one you're using today.</p>
<p class="ng-scope">Try to make your code
readable/maintainable so that future-you doesn't get angry at present-you for making things messy.</p>
<p class="ng-scope">Parse has documented their REST API <a href="https://www.parse.com/docs/rest#general">here</a>.
Please note that you will only need to use a small part of it. In the <a href="https://www.parse.com/docs/rest#general-quick">Quick
Reference</a> section, there's a
heading named "Objects" that you'll need to refer to. You'll also need to refer
to the <a href="https://www.parse.com/docs/rest#general-requests">Request Format</a>
section.</p>
<p class="ng-scope">Parse is a very generalized system and will allow you to store any kind of
object you like. During this sprint, we'll be using it as a shared message storage server
that everyone in the class can read and write from (via REST).</p>
<p class="ng-scope">The message objects you send to the parse server (via POST requests) should be in the following format:</p>
<pre class="ng-scope"><code class="lang-javascript"><span class="keyword">var</span> message = {
  username: <span class="string">'bob'</span>,
  text: <span class="string">'trololo'</span>,
  roomname: <span class="string">'4chan'</span>
};
</code></pre>
<p class="ng-scope">To get you started, here's an example POST request. Note that any messages you POST to the server are
viewable by <em>everyone</em>, so be nice.</p>
<pre class="ng-scope"><code class="lang-javascript">$.ajax({
  <span class="comment">// This is the url you should use to communicate with the parse API server.</span>
  url: <span class="string">'https://api.parse.com/1/classes/chatterbox'</span>,
  type: <span class="string">'POST'</span>,
  data: JSON.stringify(message),
  contentType: <span class="string">'application/json'</span>,
  success: <span class="function"><span class="keyword">function</span> <span class="params">(data)</span> {</span>
    console.log(<span class="string">'chatterbox: Message sent'</span>);
  },
  error: <span class="function"><span class="keyword">function</span> <span class="params">(data)</span> {</span>
    <span class="comment">// See: https://developer.mozilla.org/en-US/docs/Web/API/console.error</span>
    console.error(<span class="string">'chatterbox: Failed to send message'</span>);
  }
});
</code></pre>
<h4 class="ng-scope" id="api-keys-and-git">API Keys and Git</h4>
<p class="ng-scope">You should <em>NEVER</em> check in API Keys to version control. It's easy to accidentally commit sensitive data to your git repo if you're not careful. If you do so (and push to GitHub), everyone will have access to your private keys (which means they can mess with your data).</p>
<p class="ng-scope">A common practice (which we adopt here) is to prevent that by storing our API keys in a special file <code>config.js</code> (referenced in <code>client/index.html</code>) that we add to our <code>.gitignore</code> so that it's never commited to our repo. This means that after you clone down the repo, before running the app, you must re-create that special file and add your API keys to it or the app won't run.</p>
<p class="ng-scope">To make this easier and less prone to breakage, we create a dummy file (which we <em>do</em> commit) in the correct format, and add placeholders for the real data within it. In this application, that dummy file is located at <code>client/env/config.example.js</code>.</p>
<p class="ng-scope">To get your application running with the real API keys, follow these steps:</p>
<ol class="ng-scope">
<li>Duplicate <code>client/env/config.example.js</code> renaming it to <code>client/env/config.js</code> in the process.<ul>
<li>NOTE: You've now created the file referenced in <code>client/index.html</code> as <code>client/env/config.js</code> that your app requires in order to run.</li>
<li>NOTE: <code>client/env/config.js</code> is also ignored in your <code>.gitignore</code> so that the API keys you add won't be commited.</li>
</ul>
</li>
<li>Replace the placeholder strings in your newly created <code>client/env/config.js</code> with the following real KEYS:<ul>
<li>PARSE_APP_ID: <code>rRKWP5YrY0T9LI0aQbu54F1aSkykST7rqzrSk4PS</code></li>
<li>PARSE_API_ID: <code>v4zlK5xbHARkmemNgdmMHZsmDnt1JTP7eyI0FhM0</code></li>
</ul>
</li>
</ol>
<h3 class="ng-scope" id="-package-management-"><a href="https://en.wikipedia.org/wiki/Package_management_system">Package Management</a></h3>
<p class="ng-scope">A package manager is a tool for automating the process of installing, upgrading, configuring
and managing dependencies (<a href="http://underscorejs.org/">underscore</a>, <a href="http://jquery.com/">jquery</a>, etc) for projects. Most package managers run
through a command-line interface.</p>
<p class="ng-scope">You've used at least one package manager already (<a href="http://brew.sh/">homebrew</a>). Today, you'll use a popular
package manager called <strong>bower</strong> to install and keep track of the tools your client-side code requires.</p>
<h3 class="ng-scope" id="-bower-bower-"><a href="http://bower.io">Bower</a></h3>
<p class="ng-scope">Instead of manually downloading all your dependencies to a 'lib' folder that you track with git, You'll
use bower to install and manage everything!</p>
<p class="ng-scope">Bower is a generic, unopinionated solution to the problem of front-end (client-side) package management.</p>
<ul class="ng-scope">
<li>There are no system wide dependencies (everything is installed locally within your projects' <code>bower_components</code> directory)</li>
<li>Dependencies aren't shared between different apps (if two seperate projects require underscore.js, both get their own copy of underscore.js)</li>
<li>The dependency tree is flat (no packages depend on other packages).</li>
</ul>
<p class="ng-scope">There are two files in this repo that control/affect the behavior of bower:</p>
<ul class="ng-scope">
<li><code>/bower.json</code> - Project manifest where we define our project dependencies</li>
<li><code>/.bowerrc</code> - Bower configuration file where we define where the dependencies need to be installed</li>
</ul>
<h2 class="ng-scope" id="basic-requirements-">Basic requirements:</h2>
<h3 class="ng-scope" id="bower">Bower</h3>
<ul class="ng-scope">
<li><input class="readme-checkbox" name="task-1" type="checkbox">Take a look at <code>bower.json</code> and note the library listed under 'dependencies'. When <code>bower install</code> is run<pre><code><span class="built_in">from</span> <span class="operator">the</span> <span class="command"><span class="keyword">command</span> <span class="title">line</span>, <span class="title">the</span> <span class="title">packages</span> <span class="title">listed</span> <span class="title">here</span> <span class="title">will</span> <span class="title">be</span> <span class="title">automatically</span> <span class="title">installed</span> <span class="title">to</span> `<span class="title">client</span>/<span class="title">bower_components</span>`.</span>
</code></pre></li>
<li>Bower depends on Node and npm (we'll cover those in an upcoming sprint).<ul>
<li><input class="readme-checkbox" name="task-2" type="checkbox">Assuming you have those installed already, install Bower globally using npm, <code>npm install -g bower</code></li>
</ul>
</li>
<li>Use bower to install the client-side dependancies listed in bower.json for this repo:<ul>
<li><input class="readme-checkbox" name="task-3" type="checkbox">Run the following command from the root directory of the repo <code>bower install</code>.</li>
</ul>
</li>
<li>Add underscore as a bower dependency of your project:<ul>
<li><input class="readme-checkbox" name="task-4" type="checkbox">Run the following command from the root directory of the repo <code>bower install --save underscore</code>.<pre><code>Make sure <span class="keyword">to</span> look <span class="keyword">at</span> bower.json <span class="keyword">and</span> `client/bower_components` <span class="keyword">before</span> <span class="keyword">and</span> <span class="keyword">after</span> you <span class="command">run</span> this command.
</code></pre></li>
<li><input class="readme-checkbox" name="task-5" type="checkbox">Add underscore to <code>client/index.html</code> so that you can use it in your solution.<pre><code>See <span class="built_in">line</span> <span class="number">9</span> <span class="operator">of</span> `client/index.html` <span class="keyword">for</span> <span class="operator">the</span> correct syntax.
</code></pre></li>
</ul>
</li>
<li>Continue to use bower to install (and keep track of) any additional libraries you add as you work through this sprint.</li>
</ul>
<h3 class="ng-scope" id="messages">Messages</h3>
<p class="ng-scope">Open up client/scripts/app.js and start coding.</p>
<p class="ng-scope"><strong>Note:</strong> The url you should be using is <code>https://api.parse.com/1/classes/chatterbox</code></p>
<ul class="ng-scope">
<li><input class="readme-checkbox" name="task-6" type="checkbox">Display messages retrieved from the parse server.</li>
<li><input class="readme-checkbox" name="task-7" type="checkbox">Setup a way to refresh the displayed messages (either automatically or with a button).</li>
<li><input class="readme-checkbox" name="task-8" type="checkbox">Be careful to use proper escaping on any user input. Since you're<pre><code>displaying input <span class="keyword">that</span> other users have typed, your app <span class="keyword">is</span> vulnerable
XSS attacks.
</code></pre></li>
</ul>
<p class="ng-scope"><strong>Note</strong>: If you issue an XSS attack, please make it innocuous enough to be educational,
rather than disruptive.</p>
<ul class="ng-scope">
<li><input class="readme-checkbox" name="task-9" type="checkbox">Allow users to select a username and send messages</li>
</ul>
<h4 class="ng-scope" id="a-note-about-escaping">A Note About Escaping</h4>
<p class="ng-scope">Escaping is the way we ensure that when users input things to our sites, we don't allow them to write our
site's code for us! For example, what if someone's username was <code>;document.createElement('div').text('you got pwned');</code>?
If we didn't escape, that 'username' would get executed just like any other code, and all the sudden you'll have a
new div on your site that says 'you got pwned', anytime that person's username is displayed.</p>
<p class="ng-scope">Now that might seem trivial, but understand that attacks like this can affect (or transmit) your
users data too. That's not cool.</p>
<p class="ng-scope">You'll need to figure out a way to effectively protect your app against cross-site scripting (XSS) attacks
issued by your class-mates during this sprint. Part of the fun of this sprint is figuring out how to do so.</p>
<p class="ng-scope">As always, google is your friend :). If you're curious, you can read about some of the nuances associated
with escaping html <a href="http://wonko.com/post/html-escaping">here</a>.</p>
<h3 class="ng-scope" id="rooms">Rooms</h3>
<ul class="ng-scope">
<li><input class="readme-checkbox" name="task-10" type="checkbox">Allow users to create rooms and enter existing rooms<pre><code>  - Rooms are defined <span class="keyword">by</span> <span class="keyword">the</span> `.room` <span class="keyword">property</span> <span class="keyword">of</span> messages, so you'll need <span class="keyword">to</span> sort them somehow.
</code></pre></li>
</ul>
<h3 class="ng-scope" id="socializing">Socializing</h3>
<ul class="ng-scope">
<li><input class="readme-checkbox" name="task-11" type="checkbox">Allow users to 'befriend' other users by clicking on their username</li>
<li><input class="readme-checkbox" name="task-12" type="checkbox">Display all messages sent by friends in bold</li>
</ul>
<h3 class="ng-scope" id="backbone-introduction">Backbone Introduction</h3>
<p class="ng-scope">Backbone.js is a JavaScript MVC (model-view-controller) framework for front-end development which works well
with jQuery and Underscore.js. Backbone.js is great for building client-heavy, so-called one-page
apps like Gmail, Google Docs, and Asana.</p>
<ul class="ng-scope">
<li>Complete the Hack Reactor Backbone intro (you have access to this repo on github)<ul>
<li><input class="readme-checkbox" name="task-13" type="checkbox">spine</li>
</ul>
</li>
</ul>
<h2 class="ng-scope" id="example-">Example:</h2>
<p class="ng-scope"><img src="https://cloud.githubusercontent.com/assets/15180/5589913/efaba092-90dd-11e4-95bb-365c53dc4b91.gif" alt="Project Demo Image"></p>
<h2 class="ng-scope" id="extra-credit">Extra Credit</h2>
<h3 class="ng-scope" id="convert-your-app-to-use-backbone-">Convert your app to use Backbone!</h3>
<ul class="ng-scope">
<li><input class="readme-checkbox" name="task-14" type="checkbox">Use your newfound knowledge to convert your app to use Backbone!</li>
</ul>
<h3 class="ng-scope" id="other-fun-stuff">Other fun stuff</h3>
<ul class="ng-scope">
<li><input class="readme-checkbox" name="task-15" type="checkbox">Write your own templating engine from scratch</li>
<li><input class="readme-checkbox" name="task-16" type="checkbox">Encrypt your messages so that even though everyone can see that<pre><code><span class="transposed_variable">you'</span>ve sent one, only the people you specify can actually decrypt <span class="built_in">and</span> view <span class="transposed_variable">it.</span>
</code></pre></li>
<li><input class="readme-checkbox" name="task-17" type="checkbox">Allow users to have more than one room open at a time using tabs</li>
<li><input class="readme-checkbox" name="task-18" type="checkbox">Show unread message counts in open tabs &amp; a special notifier when the user is mentioned</li>
<li><input class="readme-checkbox" name="task-19" type="checkbox">Add a 'settings' pane where the user can change their info and upload a photo</li>
<li><input class="readme-checkbox" name="task-20" type="checkbox">Show a history of of your username mentions</li>
</ul>
