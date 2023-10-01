<h1>Star Wars Angular Application</h1>

<p>Welcome to the Star Wars Angular Application repository! This application is built using Angular and includes several features and requirements as outlined below. Please follow this guide to set up and run the application.</p>

<h2>Technical Implementation</h2>

<h3>Angular Version</h3>
<p>This project uses Angular Version 16+.</p>

<h3>Angular Routing</h3>
<p>Angular routing is implemented for different component communication.</p>

<h3>Loading Spinner</h3>
<p>A loading spinner is displayed during data loading when HTTP requests are made.</p>

<h3>State Management</h3>
<p>NGXS libraries are used for state management of the application.</p>
<p>Extra requests are avoided by fetching data from the state if the API data is loaded and the page is not refreshed.</p>

<h3>Design and Styling</h3>
<p>Angular Bootstrap and basic styles are used for designing the page.</p>
<p>Bootstrap (responsive) design is used to make the application mobile-friendly.</p>

<h3>Optimization</h3>
<p>RxJS and lodash are used for code optimization.</p>

<h3>Browser Compatibility</h3>
<p>This application supports the latest version of Google Chrome.</p>

<h3>Unit Testing</h3>
<p>Basic unit tests are provided for component functions and services.</p>

<h2>Installation</h2>
<p>To get started, install the required packages by running either of the following commands:</p>
<pre>
    <code>npm install</code>
</pre>
<p>or</p>
<pre>
    <code>yarn add</code>
</pre>

<h2>Development Server</h2>
<p>Run the development server by executing the following command:</p>
<pre>
    <code>ng serve</code>
</pre>
<p>or</p>
<pre>
    <code>npm start</code>
</pre>
<p>Navigate to <a href="http://localhost:4200/homePage">http://localhost:4200/homePage</a>. The application will automatically reload if you change any of the source files.</p>

<h2>Build</h2>
<p>To build the project, run the following command:</p>
<pre>
    <code>ng build</code>
</pre>
<p>The build artifacts will be stored in the <code>dist/</code> directory.</p>