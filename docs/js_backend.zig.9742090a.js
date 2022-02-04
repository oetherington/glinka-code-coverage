var data = {lines:[
{"lineNum":"    1","line":"// glinka"},
{"lineNum":"    2","line":"// Copyright (C) 2021-2022 Ollie Etherington"},
{"lineNum":"    3","line":"// <www.etherington.io>"},
{"lineNum":"    4","line":"//"},
{"lineNum":"    5","line":"// This program is free software: you can redistribute it and/or modify"},
{"lineNum":"    6","line":"// it under the terms of the GNU Affero General Public License as published"},
{"lineNum":"    7","line":"// by the Free Software Foundation, either version 3 of the License, or"},
{"lineNum":"    8","line":"// (at your option) any later version."},
{"lineNum":"    9","line":"//"},
{"lineNum":"   10","line":"// This program is distributed in the hope that it will be useful,"},
{"lineNum":"   11","line":"// but WITHOUT ANY WARRANTY; without even the implied warranty of"},
{"lineNum":"   12","line":"// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the"},
{"lineNum":"   13","line":"// GNU Affero General Public License for more details."},
{"lineNum":"   14","line":"//"},
{"lineNum":"   15","line":"// You should have received a copy of the GNU Affero General Public License"},
{"lineNum":"   16","line":"// along with this program. If not, see <http://www.gnu.org/licenses/>."},
{"lineNum":"   17","line":""},
{"lineNum":"   18","line":"const std = @import(\"std\");"},
{"lineNum":"   19","line":"const expectEqualStrings = std.testing.expectEqualStrings;"},
{"lineNum":"   20","line":"const Allocator = std.mem.Allocator;"},
{"lineNum":"   21","line":"const Backend = @import(\"../../common/backend.zig\").Backend;"},
{"lineNum":"   22","line":"const Cursor = @import(\"../../common/cursor.zig\").Cursor;"},
{"lineNum":"   23","line":"const WriteContext = @import(\"../../common/writer.zig\").WriteContext;"},
{"lineNum":"   24","line":"const node = @import(\"../../common/node.zig\");"},
{"lineNum":"   25","line":"const Node = node.Node;"},
{"lineNum":"   26","line":"const NodeType = node.NodeType;"},
{"lineNum":"   27","line":"const exprEmitter = @import(\"expr_emitter.zig\");"},
{"lineNum":"   28","line":"const blockEmitter = @import(\"block_emitter.zig\");"},
{"lineNum":"   29","line":"const declEmitter = @import(\"decl_emitter.zig\");"},
{"lineNum":"   30","line":"const condEmitter = @import(\"cond_emitter.zig\");"},
{"lineNum":"   31","line":"const loopEmitter = @import(\"loop_emitter.zig\");"},
{"lineNum":"   32","line":"const throwEmitter = @import(\"throw_emitter.zig\");"},
{"lineNum":"   33","line":"const functionEmitter = @import(\"function_emitter.zig\");"},
{"lineNum":"   34","line":"const classEmitter = @import(\"class_emitter.zig\");"},
{"lineNum":"   35","line":""},
{"lineNum":"   36","line":"const jsPrelude ="},
{"lineNum":"   37","line":"    \\\\// Generated by glinka"},
{"lineNum":"   38","line":"    \\\\var __extends = (this && this.__extends) || (function () {"},
{"lineNum":"   39","line":"    \\\\  var extendStatics = function (d, b) {"},
{"lineNum":"   40","line":"    \\\\      extendStatics = Object.setPrototypeOf ||"},
{"lineNum":"   41","line":"    \\\\          ({ __proto__: [] } instanceof Array &&"},
{"lineNum":"   42","line":"    \\\\            function (d, b) { d.__proto__ = b; }) ||"},
{"lineNum":"   43","line":"    \\\\          function (d, b) {"},
{"lineNum":"   44","line":"    \\\\            for (var p in b)"},
{"lineNum":"   45","line":"    \\\\                if (Object.prototype.hasOwnProperty.call(b, p))"},
{"lineNum":"   46","line":"    \\\\                    d[p] = b[p];"},
{"lineNum":"   47","line":"    \\\\          };"},
{"lineNum":"   48","line":"    \\\\      return extendStatics(d, b);"},
{"lineNum":"   49","line":"    \\\\  };"},
{"lineNum":"   50","line":"    \\\\  return function (d, b) {"},
{"lineNum":"   51","line":"    \\\\      if (typeof b !== \"function\" && b !== null)"},
{"lineNum":"   52","line":"    \\\\          throw new TypeError(\"Class extends value \" + String(b) +"},
{"lineNum":"   53","line":"    \\\\            \" is not a constructor or null\");"},
{"lineNum":"   54","line":"    \\\\      extendStatics(d, b);"},
{"lineNum":"   55","line":"    \\\\      function __() { this.constructor = d; }"},
{"lineNum":"   56","line":"    \\\\      d.prototype = b === null"},
{"lineNum":"   57","line":"    \\\\        ? Object.create(b)"},
{"lineNum":"   58","line":"    \\\\        : (__.prototype = b.prototype, new __());"},
{"lineNum":"   59","line":"    \\\\  };"},
{"lineNum":"   60","line":"    \\\\})();"},
{"lineNum":"   61","line":"    \\\\"},
{"lineNum":"   62","line":";"},
{"lineNum":"   63","line":""},
{"lineNum":"   64","line":"const jsEpilog = \"// End of glinka compilation\";"},
{"lineNum":"   65","line":""},
{"lineNum":"   66","line":"pub const JsBackend = struct {"},
{"lineNum":"   67","line":"    const WriteCtx = WriteContext(.{});"},
{"lineNum":"   68","line":""},
{"lineNum":"   69","line":"    backend: Backend,"},
{"lineNum":"   70","line":"    writeCtx: *WriteCtx,"},
{"lineNum":"   71","line":"    out: WriteCtx.Writer,"},
{"lineNum":"   72","line":""},
{"lineNum":"   73","line":"    pub fn new(alloc: Allocator) !JsBackend {","class":"lineCov","hits":"1","order":"65","possible_hits":"1",},
{"lineNum":"   74","line":"        var ctx = try WriteCtx.new(alloc);","class":"lineCov","hits":"1","order":"66","possible_hits":"1",},
{"lineNum":"   75","line":"        return JsBackend{","class":"lineCov","hits":"2","order":"77","possible_hits":"2",},
{"lineNum":"   76","line":"            .backend = Backend{"},
{"lineNum":"   77","line":"                .callbacks = .{"},
{"lineNum":"   78","line":"                    .prolog = JsBackend.prolog,","class":"lineCov","hits":"1","order":"78","possible_hits":"1",},
{"lineNum":"   79","line":"                    .epilog = JsBackend.epilog,","class":"lineCov","hits":"1","order":"79","possible_hits":"1",},
{"lineNum":"   80","line":"                    .processNode = JsBackend.processNode,","class":"lineCov","hits":"1","order":"80","possible_hits":"1",},
{"lineNum":"   81","line":"                },"},
{"lineNum":"   82","line":"            },"},
{"lineNum":"   83","line":"            .writeCtx = ctx,","class":"lineCov","hits":"1","order":"81","possible_hits":"1",},
{"lineNum":"   84","line":"            .out = ctx.writer(),","class":"lineCov","hits":"1","order":"82","possible_hits":"1",},
{"lineNum":"   85","line":"        };"},
{"lineNum":"   86","line":"    }"},
{"lineNum":"   87","line":""},
{"lineNum":"   88","line":"    pub fn deinit(self: *JsBackend) void {","class":"lineCov","hits":"2","order":"124","possible_hits":"2",},
{"lineNum":"   89","line":"        self.writeCtx.deinit();","class":"lineCov","hits":"1","order":"125","possible_hits":"1",},
{"lineNum":"   90","line":"    }"},
{"lineNum":"   91","line":""},
{"lineNum":"   92","line":"    pub fn toString(self: JsBackend) ![]u8 {","class":"lineCov","hits":"1","order":"105","possible_hits":"1",},
{"lineNum":"   93","line":"        return try self.writeCtx.toString();","class":"lineCov","hits":"1","order":"106","possible_hits":"1",},
{"lineNum":"   94","line":"    }"},
{"lineNum":"   95","line":""},
{"lineNum":"   96","line":"    pub fn freeString(self: JsBackend, str: []u8) void {","class":"lineCov","hits":"1","order":"119","possible_hits":"1",},
{"lineNum":"   97","line":"        return self.writeCtx.freeString(str);","class":"lineCov","hits":"1","order":"120","possible_hits":"1",},
{"lineNum":"   98","line":"    }"},
{"lineNum":"   99","line":""},
{"lineNum":"  100","line":"    fn getSelf(be: *Backend) *JsBackend {","class":"lineCov","hits":"1","order":"91","possible_hits":"1",},
{"lineNum":"  101","line":"        return @fieldParentPtr(JsBackend, \"backend\", be);","class":"lineCov","hits":"1","order":"92","possible_hits":"1",},
{"lineNum":"  102","line":"    }"},
{"lineNum":"  103","line":""},
{"lineNum":"  104","line":"    fn prolog(be: *Backend) Backend.Error!void {","class":"lineCov","hits":"2","order":"89","possible_hits":"2",},
{"lineNum":"  105","line":"        const self = JsBackend.getSelf(be);","class":"lineCov","hits":"1","order":"90","possible_hits":"1",},
{"lineNum":"  106","line":"        try self.out.print(\"{s}\", .{jsPrelude});","class":"lineCov","hits":"1","order":"93","possible_hits":"1",},
{"lineNum":"  107","line":"    }"},
{"lineNum":"  108","line":""},
{"lineNum":"  109","line":"    fn epilog(be: *Backend) Backend.Error!void {","class":"lineCov","hits":"2","order":"137","possible_hits":"2",},
{"lineNum":"  110","line":"        const self = JsBackend.getSelf(be);","class":"lineCov","hits":"1","order":"138","possible_hits":"1",},
{"lineNum":"  111","line":"        try self.out.print(\"{s}\", .{jsEpilog});","class":"lineCov","hits":"1","order":"139","possible_hits":"1",},
{"lineNum":"  112","line":"    }"},
{"lineNum":"  113","line":""},
{"lineNum":"  114","line":"    fn processNode(be: *Backend, nd: Node) Backend.Error!void {","class":"lineCov","hits":"2","order":"5520","possible_hits":"2",},
{"lineNum":"  115","line":"        const self = JsBackend.getSelf(be);","class":"lineCov","hits":"1","order":"5521","possible_hits":"1",},
{"lineNum":"  116","line":"        try self.emitNode(nd);","class":"lineCov","hits":"1","order":"5522","possible_hits":"1",},
{"lineNum":"  117","line":"    }"},
{"lineNum":"  118","line":""},
{"lineNum":"  119","line":"    pub fn emitExpr(self: JsBackend, value: Node) Backend.Error!void {","class":"lineCov","hits":"1","order":"5545","possible_hits":"1",},
{"lineNum":"  120","line":"        return try exprEmitter.emitExpr(self, value);","class":"lineCov","hits":"1","order":"5546","possible_hits":"1",},
{"lineNum":"  121","line":"    }"},
{"lineNum":"  122","line":""},
{"lineNum":"  123","line":"    pub fn emitNode(self: *JsBackend, nd: Node) Backend.Error!void {","class":"lineCov","hits":"2","order":"5523","possible_hits":"2",},
{"lineNum":"  124","line":"        switch (nd.data) {","class":"lineCov","hits":"2","order":"5524","possible_hits":"2",},
{"lineNum":"  125","line":"            .Ident,"},
{"lineNum":"  126","line":"            .Int,"},
{"lineNum":"  127","line":"            .String,"},
{"lineNum":"  128","line":"            .Template,"},
{"lineNum":"  129","line":"            .True,"},
{"lineNum":"  130","line":"            .False,"},
{"lineNum":"  131","line":"            .Null,"},
{"lineNum":"  132","line":"            .Undefined,"},
{"lineNum":"  133","line":"            .PrefixOp,"},
{"lineNum":"  134","line":"            .PostfixOp,"},
{"lineNum":"  135","line":"            .BinaryOp,"},
{"lineNum":"  136","line":"            .Ternary,"},
{"lineNum":"  137","line":"            .Call,"},
{"lineNum":"  138","line":"            .Array,"},
{"lineNum":"  139","line":"            .ArrayAccess,"},
{"lineNum":"  140","line":"            .Dot,"},
{"lineNum":"  141","line":"            .Object,"},
{"lineNum":"  142","line":"            .New,"},
{"lineNum":"  143","line":"            => {"},
{"lineNum":"  144","line":"                try self.emitExpr(nd);","class":"lineCov","hits":"1","order":"5544","possible_hits":"1",},
{"lineNum":"  145","line":"                try self.out.print(\";\\n\", .{});","class":"lineCov","hits":"1","order":"5550","possible_hits":"1",},
{"lineNum":"  146","line":"            },"},
{"lineNum":"  147","line":"            .Block => try blockEmitter.emitBlock(self, nd.data.Block.items),","class":"lineCov","hits":"2","order":"5525","possible_hits":"2",},
{"lineNum":"  148","line":"            .Decl => try declEmitter.emitDecl(self, nd.data.Decl),","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  149","line":"            .If => try condEmitter.emitCond(self, nd.data.If),","class":"lineCov","hits":"2","order":"5595","possible_hits":"2",},
{"lineNum":"  150","line":"            .Switch => try condEmitter.emitSwitch(self, nd.data.Switch),","class":"lineCov","hits":"2","order":"5694","possible_hits":"2",},
{"lineNum":"  151","line":"            .For => try loopEmitter.emitFor(self, nd.data.For),","class":"lineCov","hits":"2","order":"5740","possible_hits":"2",},
{"lineNum":"  152","line":"            .While => try loopEmitter.emitWhile(self, nd.data.While),","class":"lineCov","hits":"2","order":"5785","possible_hits":"2",},
{"lineNum":"  153","line":"            .Do => try loopEmitter.emitDo(self, nd.data.Do),","class":"lineCov","hits":"2","order":"5802","possible_hits":"2",},
{"lineNum":"  154","line":"            .Break => try loopEmitter.emitBreak(self, nd.data.Break),","class":"lineCov","hits":"2","order":"5710","possible_hits":"2",},
{"lineNum":"  155","line":"            .Continue => try loopEmitter.emitContinue(self, nd.data.Continue),","class":"lineCov","hits":"2","order":"5827","possible_hits":"2",},
{"lineNum":"  156","line":"            .Throw => try throwEmitter.emitThrow(self, nd.data.Throw),","class":"lineCov","hits":"2","order":"5843","possible_hits":"2",},
{"lineNum":"  157","line":"            .Try => try throwEmitter.emitTry(self, nd.data.Try),","class":"lineCov","hits":"2","order":"5866","possible_hits":"2",},
{"lineNum":"  158","line":"            .Function => try functionEmitter.emitFunc(self, nd.data.Function),","class":"lineCov","hits":"2","order":"5890","possible_hits":"2",},
{"lineNum":"  159","line":"            .Return => try functionEmitter.emitReturn(self, nd.data.Return),","class":"lineCov","hits":"2","order":"5706","possible_hits":"2",},
{"lineNum":"  160","line":"            .Alias => {},"},
{"lineNum":"  161","line":"            .InterfaceType => {},"},
{"lineNum":"  162","line":"            .ClassType => try classEmitter.emitClass(self, nd.data.ClassType),","class":"lineCov","hits":"2","order":"5967","possible_hits":"2",},
{"lineNum":"  163","line":"            else => std.debug.panic(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  164","line":"                \"Unhandled node type in JsBackend.processNode: {?}\\n\","},
{"lineNum":"  165","line":"                .{nd.getType()},","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  166","line":"            ),"},
{"lineNum":"  167","line":"        }"},
{"lineNum":"  168","line":"    }"},
{"lineNum":"  169","line":"};"},
{"lineNum":"  170","line":""},
{"lineNum":"  171","line":"test \"JsBackend can emit prolog\" {","class":"lineCov","hits":"3","order":"63","possible_hits":"3",},
{"lineNum":"  172","line":"    var backend = try JsBackend.new(std.testing.allocator);","class":"lineCov","hits":"1","order":"64","possible_hits":"1",},
{"lineNum":"  173","line":"    defer backend.deinit();","class":"linePartCov","hits":"1","order":"123","possible_hits":"4",},
{"lineNum":"  174","line":"    try backend.backend.prolog();","class":"linePartCov","hits":"1","order":"86","possible_hits":"2",},
{"lineNum":"  175","line":"    const str = try backend.toString();","class":"linePartCov","hits":"1","order":"104","possible_hits":"2",},
{"lineNum":"  176","line":"    defer backend.freeString(str);","class":"linePartCov","hits":"1","order":"118","possible_hits":"2",},
{"lineNum":"  177","line":"    try expectEqualStrings(jsPrelude, str);","class":"linePartCov","hits":"1","order":"117","possible_hits":"2",},
{"lineNum":"  178","line":"}"},
{"lineNum":"  179","line":""},
{"lineNum":"  180","line":"test \"JsBackend can emit epilog\" {","class":"lineCov","hits":"3","order":"132","possible_hits":"3",},
{"lineNum":"  181","line":"    var backend = try JsBackend.new(std.testing.allocator);","class":"lineCov","hits":"1","order":"133","possible_hits":"1",},
{"lineNum":"  182","line":"    defer backend.deinit();","class":"linePartCov","hits":"1","order":"143","possible_hits":"4",},
{"lineNum":"  183","line":"    try backend.backend.epilog();","class":"linePartCov","hits":"1","order":"134","possible_hits":"2",},
{"lineNum":"  184","line":"    const str = try backend.toString();","class":"linePartCov","hits":"1","order":"140","possible_hits":"2",},
{"lineNum":"  185","line":"    defer backend.freeString(str);","class":"linePartCov","hits":"1","order":"142","possible_hits":"2",},
{"lineNum":"  186","line":"    try expectEqualStrings(jsEpilog, str);","class":"linePartCov","hits":"1","order":"141","possible_hits":"2",},
{"lineNum":"  187","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-04 07:59:51", "instrumented" : 61, "covered" : 58,};
var merged_data = [];
