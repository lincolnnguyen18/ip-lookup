if screen -list | grep -q "d8"; then
  echo "d8 already started"
  exit 1
else
  echo "starting d8"
fi

. /media/sda1/deployment/ports.sh

# Start node server
screen -dmS 'd8'
screen -S 'd8' -X stuff "node .\n"

echo "Checking if node started..."
lsof -i:$d8

# Build vue client
# yarn build