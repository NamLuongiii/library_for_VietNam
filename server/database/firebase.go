package database

import (
	"context"
	"log"

	firebase "firebase.google.com/go/v4"

	"google.golang.org/api/option"
)

func FirebaseConnect() {
	config := &firebase.Config{
		StorageBucket: "vlibrary-6c105.appspot.com",
	}

	opt := option.WithCredentialsFile("firebaseServiceAccountKey.json")
	app, err := firebase.NewApp(context.Background(), config, opt)
	if err != nil {
		log.Fatalln(err)
	}

	client, err := app.Storage(context.Background())
	if err != nil {
		log.Fatalln(err)
	}

	_, err := client.DefaultBucket()
	if err != nil {
		log.Fatalln(err)
	}

}
