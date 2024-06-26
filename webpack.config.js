const path = require('path'); 
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 
const CopyPlugin = require('copy-webpack-plugin'); 
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); 
const ProgressWebpackPlugin = require('progress-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const devServer = {
    static: path.resolve(__dirname, 'src'), // Path to your source directory
    port: 8080, // Port on which the dev server will run (default: 8080)
    open: true, // Open the browser automatically when the server starts
    hot: true, // Enable hot module replacement for faster development
    // ... other devServer options
  };
  

module.exports = { 
    devServer,
    // Entry point for your application 
    entry: './src/index.js', 
    // Output configuration 
    output: { 
        filename: 'bundle.js', 
        path: path.resolve(__dirname, 'dist'), // Output directory 
        assetModuleFilename: 'assets/images/[hash][ext][query]',
        clean: true, // Enable cleaning of the output directory
      }, 
        // Module configuration for loaders 
    module: { 
            rules: [ 
                { 
                    // Rule for handling JavaScript files 
                    test: /\.js$/, 
                    include: path.resolve(__dirname, 'src/assets'), // Include only CSS from assets folder
                    exclude: /node_modules/, 
                    use: { 
                        loader: 'babel-loader', 
                        options: { 
                            presets: ['@babel/preset-env'], // Use the preset-env preset 
                            }, 
                        }, 
                    }, 
                {
                    // Rule for handling CSS files
                    test: /\.css$/,
                    use: [
                      MiniCssExtractPlugin.loader, // Extract CSS to separate file
                      'css-loader', // Process CSS
                       ],
                  },
                  {
                    // Rule for handling static assets (images, fonts, etc.)
                    test: /\.(png|jpg|gif|svg)$/,
                    use: [
                      'file-loader', // Use file-loader first
                      {
                        loader: 'url-loader',
                        options: {
                          limit: 8192, // Optional: Inline images below this size
                        },
                      },
                    ],
                  },    
                ], 
            }, 
            // Plugins configuration
    plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html', // Use your HTML template
        }),
        new MiniCssExtractPlugin({
          filename: '[name].css', // Output filename for extracted CSS
        }),
        new CopyPlugin({
          patterns: [
            { from: 'src/assets', to: 'assets' }, // Copy assets folder
          ],
        }),
    new CssMinimizerPlugin(), // Minify CSS in production mode
    new ProgressWebpackPlugin(), // Show progress during build
    new Dotenv({
      path: '.env'
    })
  ],

  // Optimization (optional, mostly for production builds)
  optimization: {
    minimize: true, // Minify code
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@images': path.resolve(__dirname, 'src/assets/images/'),
    }
  },
  // Mode (optional, set to 'production' for minification)
  mode: 'development', // Adjust based on your development/production needs
};