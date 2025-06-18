# Start with lightweight Nginx web server
FROM nginx:alpine
# Copy our config file to replace default settings
COPY nginx.conf /etc/nginx/conf.d/default.conf  
# Tell Docker this container uses port 80
EXPOSE 80                           
# Start Nginx web server when container runs             
CMD ["nginx", "-g", "daemon off;"]              