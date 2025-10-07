# Use official Nginx image
FROM nginx:alpine

# Remove default Nginx html files
RUN rm -rf /usr/share/nginx/html/*

# Copy project files to Nginx html directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
