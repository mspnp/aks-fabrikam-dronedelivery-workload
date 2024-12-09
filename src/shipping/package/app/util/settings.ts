// ------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License (MIT). See License.txt in the repo root for license information.
// ------------------------------------------------------------

import process from 'process'

export class Settings {
  static collectionName() : string {
    return process.env["COLLECTION_NAME"] || 'defaultCollectionName';
  }

  static connectionString() : string {
    return process.env["CONNECTION_STRING"] || 'defaultConectionString';
  }

  static containerName() : string {
    return process.env["CONTAINER_NAME"] || 'defaultContainerName';
  }

  static logLevel() : string {
    return process.env["LOG_LEVEL"] || 'debug'
  }
}
