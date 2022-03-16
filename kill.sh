if ! screen -list | grep -q 'd8'; then
  echo 'd8 already killed'
  exit 1
else
  echo "killing d8"
fi
. /media/sda1/deployment/ports.sh
screen -S 'd8' -X quit
echo "Checking if d8 still alive..."
lsof -i:$d8