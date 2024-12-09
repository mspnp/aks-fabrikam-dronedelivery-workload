// ------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License (MIT). See License.txt in the repo root for license information.
// ------------------------------------------------------------

import { MongoErrors } from "./util/mongo-err.js";

import appInsights from "applicationinsights";
import { MongoClient } from 'mongodb'

export class PackageServiceInitializer {
  static async initialize(
    connection: string,
    collectionName: string,
    containerName: string
  ) {
    try {
      PackageServiceInitializer.initAppInsights(containerName);
      await PackageServiceInitializer.initMongoDb(connection, collectionName);
    } catch (ex) {
      console.log(ex);
    }
  }

  private static async initMongoDb(connection: string, collectionName: string) {
    try {
      var db = (await MongoClient.connect(connection)).db();
      await db.command({
        shardCollection: db.databaseName + "." + collectionName,
        key: { tag: "hashed" },
      });
    } catch (ex: any) {
      if (ex.code != MongoErrors.CommandNotFound && ex.code != 9) {
        console.log(ex);
      }
    }
  }

  private static initAppInsights(cloudRole = "package") {
    if (
      !process.env.APPINSIGHTS_INSTRUMENTATIONKEY &&
      process.env.NODE_ENV === "development"
    ) {
      // Just log messages instead of modifying appInsights.defaultClient
      console.log(
        "Skipping App Insights setup - development mode with no instrumentation key"
      );
    } else if (process.env.APPINSIGHTS_INSTRUMENTATIONKEY) {
      appInsights.setup();
      appInsights.defaultClient.context.tags[
        appInsights.defaultClient.context.keys.cloudRole
      ] = cloudRole;
      console.log("App Insights setup - configuring client");
      appInsights.start();
      console.log("Application Insights started");
    } else {
      throw new Error(
        "No App Insights setup. A key must be specified in non-development environments."
      );
    }
  }
}
