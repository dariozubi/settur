if [ -z "$1" ]
  then
    echo "You have to add the name of the component e.g.:\n./new-component.sh Component"
    exit 1
fi

folder=src/components/$1
mkdir $folder

index=$folder/index.ts 
touch $index
echo "export * from './$1'" >> $index
echo "export { default } from './$1'" >> $index

main=$folder/$1.tsx
touch $main
echo "function $1() {" >> $main
echo "  return (" >> $main
echo "    <div className=\"\">$1</div>" >> $main
echo "  )" >> $main
echo "}" >> $main
echo "\nexport default $1" >> $main