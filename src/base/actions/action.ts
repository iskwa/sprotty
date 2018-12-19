/********************************************************************************
 * Copyright (c) 2017-2018 TypeFox and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

/**
 * An action describes a change to the model declaratively.
 * It is a plain data structure, and as such transferable between server and client. An action must never contain actual
 * SModelElement instances, but either refer to them via their ids or contain serializable schema for model elements.
 */
export interface Action {
    readonly kind: string
}

export function isAction<T>(object?: T): object is  T & Action {
    return object !== undefined && object.hasOwnProperty('kind') && typeof((object as any)['kind']) === 'string';
}

/**
 * Interface for blocking actions and commands. On dispatch, if this property is present, all following
 * actions are queued until an action is dispatched that makes this function return `true`.
 */
export interface Blocking {
    readonly blockUntil: (action: Action) => boolean;
}

export function isBlocking<T>(object?: T): object is T & Blocking {
    return object !== undefined && object.hasOwnProperty('blockUntil') && typeof((object as any)['blockUntil']) === 'function';
}
